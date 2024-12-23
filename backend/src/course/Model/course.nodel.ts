import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop({ type: String, ref: 'user' }) // Reference to the user model
  created_by: string;

  @Prop()
  created_at: Date;
}

export const CourseSchema = SchemaFactory.createForClass(course);
