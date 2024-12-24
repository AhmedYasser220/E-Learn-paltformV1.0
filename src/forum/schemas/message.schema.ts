import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Message {
  @Prop({ required: true })
  content: string;   // The content of the message

  @Prop({ required: true })
  type: 'question' | 'reply' | 'announcement';  // Type of the message

  @Prop({ required: true })
  createdBy: string;  // ID of the user who created the message

  @Prop({ default: Date.now })
  createdAt: Date;   // Date when the message was created
}

export type MessageDocument = HydratedDocument<Message>;
export const MessageSchema = SchemaFactory.createForClass(Message);
