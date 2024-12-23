import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class CourseVersion {
  @Prop({ required: true })
  version_number: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  difficulty_level: string;

  @Prop({ required: true })
  updated_by: string;

  @Prop({ default: new Date() })
  updated_at: Date;
}

@Schema()
export class Course {
  @Prop({ required: true })
  course_Id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  difficulty_level: string;

  @Prop({ required: true })
  created_by: string;

  @Prop({ default: new Date() })
  created_at: Date;

  @Prop({ default: new Date() })
  updated_at: Date;

  @Prop({ required: true, default: 1 })
  current_version: number;

  @Prop({ type: [CourseVersion], default: [] })
  versions: CourseVersion[]; // Embedded array of versions

  @Prop({ type: [String], required: false })
  multimedia_resources?: string[];


}

export const CourseSchema = SchemaFactory.createForClass(Course);
export type CourseDocument = HydratedDocument<Course>;