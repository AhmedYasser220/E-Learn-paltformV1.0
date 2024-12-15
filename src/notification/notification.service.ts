// notification.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  async createNotification(notification: Partial<Notification>): Promise<Notification> {
    const newNotification = new this.notificationModel(notification);
    return newNotification.save();
  }

  async getNotificationsByUser(userId: string): Promise<Notification[]> {
    return this.notificationModel.find({ user_id: userId }).sort({ created_at: -1 }).exec();
  }

  async markAsRead(notificationId: string): Promise<Notification> {
    return this.notificationModel.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true },
    );
  }

  async deleteNotification(notificationId: string): Promise<{ deleted: boolean }> {
    const result = await this.notificationModel.findByIdAndDelete(notificationId);
    return { deleted: !!result };
  }
}