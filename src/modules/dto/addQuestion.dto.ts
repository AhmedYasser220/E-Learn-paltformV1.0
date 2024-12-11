export class AddQuestionDto {
    module_id: string; // ID of the module
    question: {
      question: string; // The question text
      difficulty: number; // Difficulty level (e.g., 1 = Easy, 2 = Medium, 3 = Hard)
      options: string[]; // Array of options for MCQ
      correctAnswer: string; // Correct answer
      type: string; // Type of the question (e.g., 'MCQ', 'True/False')
    }[]; // Array of questions
  }
  