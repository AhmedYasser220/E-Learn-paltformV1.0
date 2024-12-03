// import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
// import  Mongoose,{HydratedDocument}  from "mongoose"


// @Schema()
// export class course{

//     @Prop()
//     course_Id: String;
    
//     @Prop()
//     title: String;

//     @Prop()
//     description: String;

//     @Prop()
//     category: String;

//     @Prop()
//     difficulty_level: String;

//     @Prop()
//     created_by: String;

//     @Prop()
//     created_at: Date;

// }
// export const CourseSchema = SchemaFactory.createForClass(course);

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
}

export const CourseSchema = SchemaFactory.createForClass(Course);
export type CourseDocument = HydratedDocument<Course>;
