import { Schema, Document } from 'mongoose';

export const ForumSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },

  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }] // Reference to messages in the forum
});

export interface Forum extends Document {
  title: string;
  description: string;
 
  messages: string[];
}