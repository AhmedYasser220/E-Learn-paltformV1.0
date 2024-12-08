/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import Mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class course {
  @IsNotEmpty()
  @IsString()
  @Prop({ required: true })
  course_Id: string;

  @IsNotEmpty()
  @IsString()
  @Prop({ required: true })
  title: string;

  @IsNotEmpty()
  @IsString()
  @Prop({ required: true })
  description: string;

  @IsNotEmpty()
  @IsString()
  @Prop({ required: true })
  category: string;

  @IsNotEmpty()
  @IsString()
  @Prop({ required: true })
  difficulty_level: string;

  @IsNotEmpty()
  @IsString()
  @Prop({ required: true })
  created_by: string;

  @IsOptional()
  @IsDate()
  @Prop({ required: false })
  created_at: Date;


  @IsOptional()
  @Prop({ type: [String], required: false })
  multimedia_resources?: string[];
}


export const CourseSchema = SchemaFactory.createForClass(course);
export type CourseDocument = HydratedDocument<course>;
