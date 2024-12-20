import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export class Question {
  @Prop({ required: true })
  question: string;

  @Prop()
  module_id: string;

  @Prop()
  course_id: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  resources: string[];

  @Prop()
  created_at: Date;

  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  difficulty: number; // Add difficulty field to the schema
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
export type QuestionDocument = HydratedDocument<Question>;

// Define the modules schema
@Schema()
export class Module {
  @Prop({ required: true })
  module_id: string;

  @Prop({ required: true })
  course_id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  resources: string[];

  @Prop({ required: true })
  created_at: Date;

  @Prop({ required: true })
  difficultyLevel: number; // 1 = Easy, 2 = Medium, 3 = Hard

  // Use the Question schema as the type for questionBank
  @Prop({ type: [QuestionSchema], default: [] })
  questionBank: Question[];
}

// Create the Module schema
export const ModuleSchema = SchemaFactory.createForClass(Module);
export type ModuleDocument = HydratedDocument<Module>;
