// Real-Time Feedback API

// feedback.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { quizzes } from '../quizzes/Model/quizzes.model';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(quizzes.name) private readonly quizModel: Model<typeof quizzes>,
  ) {}

  /**
   * Real-Time Feedback API
   * Highlights correct answers and areas for improvement
   */
  async getRealTimeFeedback(quizId: string, submittedAnswers: any[]): Promise<any> {
    const quiz = await this.quizModel.findOne({ quiz_id: quizId }).exec();
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    const quizObject = quiz.toObject(); // Converts Mongoose document to JS object
    const results = quizObject.questions.map((question: any, index: number) => {
        return {
            index: index + 1,
            questionText: question.text,
            correctAnswer: question.correctAnswer,
        };
    });
    
    return {
      totalQuestions: quiz.questions.length,
      correctAnswers: results.filter((res) => res.isCorrect).length,
      feedback: results,
    };
  }
}