// src/forum/schemas/thread.schema.ts
import { Schema, Document } from 'mongoose';

export const ThreadSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  courseId: { type: String, required: true }, // The course the thread belongs to
  type: { type: String, enum: ['question'], required: true }, // "question" type for threads
  createdAt: { type: Date, default: Date.now },
});

export interface Thread extends Document {
  title: string;
  content: string;
  courseId: string;
  type: 'question'; // Type of the message: question only for threads
  createdAt: Date;
}
