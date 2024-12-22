import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

@Schema()
export class modules {
  @IsNotEmpty()
  @IsString()
  @Prop({ required: true })
  module_id: string;

  @IsNotEmpty()
  @IsString()
  @Prop({ required: true })
  course_id: string;

  @IsNotEmpty()
  @IsString()
  @Prop({ required: true })
  title: string;

  @IsNotEmpty()
  @IsString()
  @Prop({ required: true })
  content: string;

  @IsOptional()
  @Prop({ type: [String], required: false })
  resources?: string[];

  @IsOptional()
  @IsDate()
  @Prop({ required: false })
  created_at?: Date;
}

export const ModulesSchema = SchemaFactory.createForClass(modules);
export type ModulesDocument = HydratedDocument<modules>;
