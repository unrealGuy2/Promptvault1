// backend/src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Role, NotificationType } from '@prisma/client'; // <-- Added NotificationType
import { NotificationsService } from '../notifications/notifications.service'; // <-- Added

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService, // <-- Added injection
  ) {}

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        prompts: {
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            followedBy: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Omit password from the returned object
    const { password, ...result } = user;
    return result;
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        bio: true,
        image: true,
      },
    });
  }

  updateProfile(userId: string, data: { username?: string; role?: Role; bio?: string; image?: string }) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async followUser(followerId: string, followingId: string) {
    if (followerId === followingId) {
      throw new Error('You cannot follow yourself.');
    }
    const follow = await this.prisma.follows.create({
      data: {
        followerId,
        followingId,
      },
    });

    // Create notification after successful follow
    try {
        await this.notificationsService.createNotification({
            recipientId: followingId, // The user who was followed
            actorId: followerId,     // The user who did the following
            type: NotificationType.NEW_FOLLOWER,
        });
    } catch (error) {
        // Log error but don't fail the whole follow operation
        console.error("Failed to create follow notification:", error);
    }


    return follow;
  }

  async unfollowUser(followerId: string, followingId: string) {
    // Note: We don't typically create notifications for unfollowing
    return this.prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  }

  async getFeedForUser(userId: string) {
    const following = await this.prisma.follows.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });

    const followingIds = following.map((f) => f.followingId);

    return this.prisma.prompt.findMany({
      where: {
        authorId: {
          in: followingIds,
        },
      },
      include: {
        author: {
          select: {
            id: true, // Need ID for the PromptCard key potentially
            username: true,
            email: true, // Keep email for fallback display
          },
        },
        _count: { // Also count likes for the feed prompts
          select: { likes: true }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}