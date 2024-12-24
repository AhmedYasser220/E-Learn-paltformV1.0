import { Question } from "../Model/modules.model";

export class CreateModuleDto {
  module_id: string;
  course_id: string;
  title: string;
  content: string;
  resources?: string[];
  created_at?: Date;
  difficultyLevel: number;
  questionBank: Question[];
  quizzes: string[];
}
