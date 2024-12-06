import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Progress extends Document {
  @Prop()
  courseId: string;

  @Prop()
  userId: string;

  @Prop()
  progress: number;

  @Prop()
  completedAt: Date;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);