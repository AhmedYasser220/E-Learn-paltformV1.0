import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class progress extends Document {
  @Prop()
  courseId: string;

  @Prop()
  userId: string;

  @Prop({ required: true })
  completion_percentage: number;

  @Prop()
  completedAt: Date;

  @Prop()
  courseCompleted: boolean = false;
}

export const ProgressSchema = SchemaFactory.createForClass(progress);
