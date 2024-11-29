import { Injectable } from '@nestjs/common';
//decoder to inject the model 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { quizzes } from './Model/quizzes.model';

@Injectable()
export class QuizService {
    //quizModel is a reference to the quizzes collection in DB 
  constructor(@InjectModel(quizzes.name) private quizModel: Model<quizzes>) {}

  async createAdaptiveQuiz(module_id: string, userPerformance: number): Promise<quizzes> {
    const difficulty = this.determineDifficulty(userPerformance);
    const questions = await this.getQuestionsByDifficulty(difficulty, module_id);
    
    return this.quizModel.create({
      quiz_id: 'QUIZ_' + Date.now(),
      module_id,
      questions,
      created_at: new Date(),
    });
  }

  private determineDifficulty(performance: number): number {
    if (performance < 50) return 1; // Easy
    if (performance < 75) return 2; // Medium
    return 3; // Hard
  }

  private async getQuestionsByDifficulty(difficulty: number, module_id: string) {
    // Mock data for simplicity
    return [
      { question: `Question with difficulty ${difficulty}`, difficulty, module_id },
    ];
  }
}
