// forum.schema.ts
import { Schema, Document } from 'mongoose';

export const ForumSchema = new Schema({
  courseId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export interface Forum extends Document {
  courseId: string;
  title: string;
  description: string;
  createdAt: Date;
}
