// progress.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class progress extends Document {
  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true})
  completion_percentage: number;

  @Prop()
  completedAt: Date;

  @Prop({ default: false })
  courseCompleted: boolean;

  @Prop({ required: false, type: Object, default: {} })
  moduleRatings: { [moduleId: string]: number };

  @Prop({ required: false, min: 0, max: 5 })
  courseRating: number;

  @Prop({ required: false, min: 0, max: 5 })
  instructorRating: number;
}

export const ProgressSchema = SchemaFactory.createForClass(progress);
