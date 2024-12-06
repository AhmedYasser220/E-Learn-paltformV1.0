import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ required: true })
  roomId: string;

  @Prop({ required: true })
  sender: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: Date.now })
  timestamp: Date;

  // New field for room participants and roles
  @Prop({
    type: [
      {
        userId: { type: String, required: true },
        role: { type: String, enum: ['student', 'instructor'], required: true },
      },
    ],
    default: [],
  })
  participants: { userId: string; role: string }[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
