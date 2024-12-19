export class CreateQuizDto {
  module_id: string; // ID of the module
  userPerformance: number; // Performance metric of the user
  questionCount: number; // Number of questions for the quiz
  questionTypes: string[]; // Array of question types (e.g., ['MCQ', 'True/False'])
  questions: object[]; 
}
