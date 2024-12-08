import { Schema, Document } from 'mongoose';

export const MessageSchema = new Schema({
  forumId: { type: Schema.Types.ObjectId, ref: 'Forum', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User reference (sender)
  content: { type: String, required: true },
  type: {
    type: String,
    enum: ['question', 'reply', 'announcement'],
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

export interface Message extends Document {
  forumId: string;
  userId: string;
  content: string;
  type: 'question' | 'reply' | 'announcement';
  createdAt: Date;
}