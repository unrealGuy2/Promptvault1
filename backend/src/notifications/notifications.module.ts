// backend/src/notifications/notifications.module.ts
import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { PrismaService } from '../prisma.service'; // Import PrismaService

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, PrismaService], // Add PrismaService
  exports: [NotificationsService], // Export the service so other modules can use it later
})
export class NotificationsModule {}