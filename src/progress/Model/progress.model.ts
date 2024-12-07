import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class progress {
  @Prop({ required: true })
  progress_id: string;

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  course_id: string;

  @Prop({ required: true })
  completion_percentage: number;

  @Prop({ required: true })
  last_accessed: Date;
}
export const progressSchema = SchemaFactory.createForClass(progress);
