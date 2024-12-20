export class AddQuestionDto {
  module_id: string; // ID of the module
  question: {
    question: string;
    difficulty: number;
    options: string[];
    correctAnswer: string;
    type: string;
    course_id?: string;
    title?: string;
    content?: string;
    resources?: string[];
    created_at?: Date;
  }[];
}
