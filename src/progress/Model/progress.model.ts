import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class progress {
  @Prop()
  progress_id: String;

  @Prop()
  user_id: String;

  @Prop()
  course_id: String;

  @Prop()
  completion_percentage: Number;

  @Prop()
  last_accessed: Date;
}
export const progressSchema = SchemaFactory.createForClass(progress);
