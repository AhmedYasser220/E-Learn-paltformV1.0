// notification.controller.ts
import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './notification.schema';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async createNotification(@Body() notification: Partial<Notification>): Promise<Notification> {
    return this.notificationService.createNotification(notification);
  }

  @Get('user/:userId')
  async getNotificationsByUser(@Param('userId') userId: string): Promise<Notification[]> {
    return this.notificationService.getNotificationsByUser(userId);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string): Promise<Notification> {
    return this.notificationService.markAsRead(id);
  }

  @Delete(':id')
  async deleteNotification(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.notificationService.deleteNotification(id);
  }
}
