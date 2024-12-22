import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class QuickNote {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export type QuickNoteDocument = HydratedDocument<QuickNote>;
export const QuickNoteSchema = SchemaFactory.createForClass(QuickNote);
