import { Injectable } from '@nestjs/common';
//decoder to inject the model 
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { quizzes } from './Model/quizzes.model';
import { modules } from '../modules/Model/modules.model';

@Injectable()
export class QuizzesService {
    //quizModel is a reference to the quizzes collection in DB 
  constructor(
    @InjectModel(quizzes.name) private quizModel: Model<quizzes>,
    @InjectModel(modules.name) private modulesModel: Model<modules>
   ) {}

   
  async createAdaptiveQuiz(module_id: string, userPerformance: number): Promise<quizzes> {

    // Validate if the module_id exists in the modules collection
    const moduleExists = await this.modulesModel.findById(module_id).exec();
    if (!moduleExists) {
      throw new Error(`Module with ID ${module_id} does not exist`);
    } 

    const difficulty = this.determineDifficulty(userPerformance);
    const questions = await this.getQuestionsByDifficulty(difficulty, module_id);
    
    return this.quizModel.create({
      quiz_id: 'QUIZ_' + Date.now(),
      module_id: new Types.ObjectId(module_id),
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

  async getQuizById(quiz_id: string): Promise<quizzes | null> {
    return this.quizModel.findOne({ quiz_id }).exec();
  }
  
}
