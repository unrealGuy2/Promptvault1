// backend/src/notifications/notifications.controller.ts
import { Controller, Get, Post, Body, UseGuards, Request, Patch } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../users/users.controller'; // Assuming JwtAuthGuard is exported from UserController

@Controller('notifications')
@UseGuards(JwtAuthGuard) // Protect all routes in this controller
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findUserNotifications(@Request() req) {
    const userId = req.user.userId;
    return this.notificationsService.findForUser(userId);
  }

  // Endpoint to mark specific notifications as read
  @Patch('read')
  markNotificationsAsRead(@Request() req, @Body() body: { ids: string[] }) {
    const userId = req.user.userId;
    return this.notificationsService.markAsRead(userId, body.ids);
  }

  // Endpoint to mark ALL notifications as read
  @Post('read-all') // Using POST as it's an action, though PATCH could also fit
  markAllNotificationsAsRead(@Request() req) {
      const userId = req.user.userId;
      return this.notificationsService.markAllAsRead(userId);
  }
}