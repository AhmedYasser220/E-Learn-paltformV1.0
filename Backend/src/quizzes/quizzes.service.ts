import { Injectable, NotFoundException } from '@nestjs/common';
//decoder to inject the model 
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { quizzes } from './Model/quizzes.model';
import { user } from 'src/user/Models/user.schema';
import { ModuleDocument, Module } from '../modules/Model/modules.model';
@Injectable()
export class QuizzesService {

  constructor(
    @InjectModel(quizzes.name) private quizModel: Model<quizzes>,
    @InjectModel('module') private readonly moduleModel: Model<Module>, // Injecting the module model
    @InjectModel(user.name) private readonly userModel: Model<user>,
  ) {}

   // create quiz 
  async createAdaptiveQuiz(
    module_id: string, 
    userPerformance: number ,
    questionCount: number, 
    questionTypes: string[],
    ): Promise<quizzes> {

    // Validate if the module_id exists in the modules collection
    const moduleExists = await this.moduleModel.findById(module_id).exec();
    if (!moduleExists) {
      throw new Error(`Module with ID ${module_id} does not exist`);
    } 

    if (!moduleExists.questionBank || moduleExists.questionBank.length === 0) {
      throw new Error(`No questions available in the question bank for module ID ${module_id}`);
    }
    const difficulty = this.determineDifficulty(userPerformance);
  

    const questions = await this.getQuestionsByDifficultyAndType(
      difficulty,
      moduleExists,
      questionCount,
      questionTypes,
    );
    
    return this.quizModel.create({
      quiz_id: 'QUIZ_' + Date.now(),
      module_id: new Types.ObjectId(module_id),
      questions,
      created_at: new Date(),
    });
  }
 // difficulty of quiz 
  private determineDifficulty(performance: number): number {
    if (performance < 50) return 1; // Easy
    if (performance < 75) return 2; // Medium
    return 3; // Hard
  }

  // Questions by difficulty and type (MCQ or True,False)
  private async getQuestionsByDifficultyAndType(
    difficulty: number,
    module: ModuleDocument,
    questionCount: number,
    questionTypes: string[],
  ) {
    let filteredQuestions = module.questionBank.filter(
      (q) => q.difficulty === difficulty 
    );
  
    // If questionTypes are provided, filter by type as well
    if (questionTypes.length > 0) {
      filteredQuestions = filteredQuestions.filter(q => questionTypes.includes(q.type));
    }
  
    const shuffled = filteredQuestions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, questionCount);
  }
// get quiz by id 
  async getQuizById(quiz_id: string): Promise<quizzes | null> {
    return this.quizModel.findOne({ quiz_id }).exec();
  }

  // Method to fetch quizzes by student email
  async getQuizzesByStudentEmail(email: string) {
    // Fetch the student using the email
    const student = await this.userModel.findOne({ email }).exec();

    if (!student) {
      throw new NotFoundException(`Student with email ${email} not found`);
    }

    // // Fetch quizzes based on the student's enrolled modules
    // const moduleIds = student.enrolledModules;
    // if (moduleIds.length === 0) {
    //   throw new NotFoundException('Student is not enrolled in any modules');
    // }

    // const quizzes = await this.quizModel.find({ module_id: { $in: moduleIds } }).exec();
    // return quizzes;
  }


}
