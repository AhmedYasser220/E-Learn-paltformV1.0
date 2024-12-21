import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class progress {
  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  completion_percentage: number;

  @Prop()
  completedAt: Date;
}

export type progressDocument = progress & Document;
export const progressSchema = SchemaFactory.createForClass(progress);
