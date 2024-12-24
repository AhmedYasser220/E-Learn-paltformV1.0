// export class CreateQuizDto {
//   module_id: string; // ID of the module
//   userPerformance: number; // Performance metric of the user
//   questionCount: number; // Number of questions for the quiz
//   questionTypes: string[]; // Array of question types (e.g., ['MCQ', 'True/False'])
//   questions: object[]; 
// }

export class QuestionDto {
  questionText: string;
  options: string[]; // Options for MCQs or true/false
  correctAnswer: string; // Correct answer for the question
}

export class CreateQuizDto {
  module_id: string;
  userPerformance: number;
  questionCount: number;
  questionTypes: string[];
  questions: QuestionDto[];  // Using the QuestionDto for better type safety
}
