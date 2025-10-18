// backend/src/prompts/prompts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NotificationType } from '@prisma/client'; // <-- Added NotificationType
import { NotificationsService } from '../notifications/notifications.service'; // <-- Added

@Injectable()
export class PromptsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService, // <-- Added injection
  ) {}

  create(data: { title: string; description: string; tags: string[]; category: string; authorId: string }) {
    return this.prisma.prompt.create({ data });
  }

  // Find a single prompt by ID (needed for comments/likes)
  async findOne(promptId: string) {
    const prompt = await this.prisma.prompt.findUnique({
      where: { id: promptId },
       include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        _count: {
          select: {
            likes: true,
          }
        }
      },
    });
     if (!prompt) {
      throw new NotFoundException('Prompt not found');
    }
    return prompt;
  }

  findAll() {
    return this.prisma.prompt.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async likePrompt(userId: string, promptId: string) {
    const prompt = await this.findOne(promptId); // Use findOne to get authorId

    const like = await this.prisma.like.create({
      data: {
        userId,
        promptId,
      },
    });

    // Create notification
    try {
        await this.notificationsService.createNotification({
            recipientId: prompt.authorId, // The author of the prompt
            actorId: userId,           // The user who liked the prompt
            type: NotificationType.PROMPT_LIKE,
            promptId: promptId,        // Include the prompt ID
        });
    } catch (error) {
        console.error("Failed to create like notification:", error);
    }


    return like;
  }

  async unlikePrompt(userId: string, promptId: string) {
    return this.prisma.like.delete({
      where: {
        userId_promptId: {
          userId,
          promptId,
        },
      },
    });
  }

  async createComment(promptId: string, authorId: string, text: string) {
     const prompt = await this.findOne(promptId); // Use findOne to get authorId

    const comment = await this.prisma.comment.create({
      data: {
        text,
        promptId,
        authorId,
      },
      include: {
        author: {
          select: { username: true, image: true },
        },
      },
    });

    // Create notification
    try {
        await this.notificationsService.createNotification({
            recipientId: prompt.authorId, // The author of the prompt
            actorId: authorId,         // The user who commented
            type: NotificationType.PROMPT_COMMENT,
            promptId: promptId,        // Include the prompt ID
        });
    } catch (error) {
        console.error("Failed to create comment notification:", error);
    }

    return comment;
  }

  findCommentsForPrompt(promptId: string) {
    return this.prisma.comment.findMany({
      where: { promptId },
      include: {
        author: {
          select: {
            username: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async forkPrompt(promptIdToFork: string, newAuthorId: string) {
    const originalPrompt = await this.prisma.prompt.findUnique({
      where: { id: promptIdToFork },
    });

    if (!originalPrompt) {
      throw new NotFoundException('Prompt to fork not found');
    }

    if (originalPrompt.authorId === newAuthorId) {
      throw new Error('You cannot fork your own prompt.');
    }

    const newPrompt = await this.prisma.prompt.create({
      data: {
        title: `Fork of: ${originalPrompt.title}`,
        description: originalPrompt.description,
        tags: originalPrompt.tags,
        category: originalPrompt.category,
        authorId: newAuthorId,
        forkedFromId: promptIdToFork,
      },
    });

    return newPrompt;
  }
}