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
  @Prop({
    type: [
      {
        filePath: { type: String, required: true },
        isOutdated: { type: Boolean, default: false },
      },
    ],
    required: false,
  })
  multimedia_resources?: { filePath: string; isOutdated: boolean }[];


  @IsNotEmpty()
  @Prop({ required: true, default: true })
  is_available: boolean;

}


export const CourseSchema = SchemaFactory.createForClass(course);
export type CourseDocument = HydratedDocument<course>;
