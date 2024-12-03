import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class course {
  @Prop()
  course_Id: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop()
  difficulty_level: string;

  @Prop()
  created_by: string;

  @Prop()
  created_at: Date;
}
export const CourseSchema = SchemaFactory.createForClass(course);
