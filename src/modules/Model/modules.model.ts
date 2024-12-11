import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// Define the question schema
@Schema()
class Question {
  @Prop({ required: true })
  question: string; // Question content

  @Prop({ required: true })
  difficulty: number; // Difficulty level (1 = Easy, 2 = Medium, 3 = Hard)

  @Prop({ required: true })
  options: string[]; // Answer options

  @Prop({ required: true })
  correctAnswer: string; // Correct answer

  @Prop({ required: true })
  type: string; // Question type (e.g., 'MCQ', 'True/False', etc.)
}

// Create the Question schema
const QuestionSchema = SchemaFactory.createForClass(Question);

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
