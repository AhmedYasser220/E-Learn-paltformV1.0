// src/forum/schemas/forum.schema.ts
import { Schema, Document } from 'mongoose';

export const ForumSchema = new Schema({
  name: { type: String, required: true },
  courseId: { type: String, required: true }, // The course ID that the forum is related to
  description: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

export interface Forum extends Document {
  name: string;
  courseId: string;
  description: string;
  createdAt: Date;
}
