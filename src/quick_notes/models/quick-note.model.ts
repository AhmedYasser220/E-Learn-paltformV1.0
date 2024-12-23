import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class QuickNote extends Document {
  @Prop({ required: true })
  userId: string; // User who owns the note

  @Prop({ required: true })
  courseId: string; // Course or module associated with the note

  @Prop({ required: true })
  content: string; // The content of the note
}

export const QuickNoteSchema = SchemaFactory.createForClass(QuickNote);
