// notification.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notification {
  @Prop()
  notification_id: string;

  @Prop()
  user_id: string;

  @Prop()
  message: string;

  @Prop()
  type: string;

  @Prop({ default: false })
  read: boolean;

  @Prop({ default: new Date() })
  created_at: Date;
}
export type NotificationDocument = Notification & Document;
export const NotificationSchema = SchemaFactory.createForClass(Notification);