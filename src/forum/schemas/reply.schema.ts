// src/forum/schemas/reply.schema.ts
import { Schema, Document } from 'mongoose';

export const ReplySchema = new Schema({
  content: { type: String, required: true },
  threadId: { type: String, required: true }, // The thread the reply is linked to
  type: { type: String, enum: ['answer', 'announcement'], required: true }, // "answer" or "announcement"
  createdAt: { type: Date, default: Date.now },
});

export interface Reply extends Document {
  content: string;
  threadId: string;
  type: 'answer' | 'announcement'; // Either an answer or an announcement for replies
  createdAt: Date;
}
