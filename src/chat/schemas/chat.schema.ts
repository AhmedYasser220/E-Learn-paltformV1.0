import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ChatMessage extends Document {
  @Prop({ required: true })
  roomId: string;

  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  message: string;

  @Prop({ type: Date, default: () => Date.now() }) // Ensure you have a timestamp field
  timestamp: Date;
  static find: any;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
