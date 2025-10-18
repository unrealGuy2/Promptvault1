// backend/src/notifications/notifications.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NotificationType } from '@prisma/client'; // Import the enum

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  // Find all notifications for a specific user
  async findForUser(userId: string) {
    return this.prisma.notification.findMany({
      where: { recipientId: userId },
      include: {
        actor: { // Include who performed the action
          select: { username: true, image: true },
        },
        prompt: { // Include the prompt if applicable
          select: { id: true, title: true },
        },
      },
      orderBy: { createdAt: 'desc' }, // Show newest first
    });
  }

  // Mark specific notifications as read
  async markAsRead(userId: string, notificationIds: string[]) {
    return this.prisma.notification.updateMany({
      where: {
        id: { in: notificationIds },
        recipientId: userId, // Ensure user can only mark their own notifications
      },
      data: { read: true },
    });
  }

  // Mark ALL notifications for a user as read
  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
        where: {
            recipientId: userId,
            read: false,
        },
        data: { read: true },
    });
  }

  // --- Function to CREATE notifications (We will use this later) ---
  async createNotification(data: {
    recipientId: string;
    actorId: string;
    type: NotificationType;
    promptId?: string;
  }) {
    // Prevent self-notifications (e.g., liking your own prompt)
    if (data.recipientId === data.actorId) {
      return null; 
    }
    
    return this.prisma.notification.create({ data });
  }
}