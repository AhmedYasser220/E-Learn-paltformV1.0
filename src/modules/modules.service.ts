import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Module, ModuleDocument} from './Model/modules.model';
import { Model } from 'mongoose';
import { AddQuestionDto } from './dto/addQuestion.dto';
@Injectable()
export class ModulesService {
    // "i made it like this because he is confused wuth the names"
  constructor(@InjectModel('module') private moduleModel: Model<ModuleDocument>) {} 
// to see if student based on performance can access the module or not 
  async canAccessModule(studentPerformance: number, module_id: string): Promise<boolean> {
    const module = await this.moduleModel.findById(module_id).exec();
    if (!module) {
      throw new Error(`Module with ID ${module_id} not found`);
    }

    return studentPerformance >= module.difficultyLevel;
  }
  // to determune the diffculty of thr modules (deh haga w diffculty of quizzes haga tanya)
  private determineDifficultyForModules(performance: number): number {
    if (performance < 40) return 1; // Easy modules for low performers
    if (performance < 70) return 2; // Medium modules for average performers
    return 3; // Hard modules for high performers
  }
/// to use it in get avalibale modules 
  async getModulesByPerformance(performance: number) {
    const difficulty = this.determineDifficultyForModules(performance);
    return this.moduleModel.find({ difficultyLevel: { $lte: difficulty } }).exec();
  }
  // to add Questions in the module (deh 8er el Questions el fe quizzes)
  async addQuestionToBank(questionDto: AddQuestionDto): Promise<Module> {
    const module = await this.moduleModel.findById(questionDto.module_id).exec();
    if (!module) {
      throw new NotFoundException(`Module with ID ${questionDto.module_id} not found`);
    }
  
    // Iterate through each question in the question array
    questionDto.question.forEach(q => {
      const newQuestion = {
        question: q.question,
        difficulty: q.difficulty,
        options: q.options,
        correctAnswer: q.correctAnswer,
        type: q.type,
      };
      module.questionBank.push(newQuestion);
    });
  
    return module.save(); // Save the updated module with new questions
  }
  // get modules by id 
  async getModuleById(module_id: string): Promise<ModuleDocument | null> {
    return this.moduleModel.findById(module_id).exec();
  }
  

}




