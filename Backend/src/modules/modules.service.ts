import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Module, ModuleDocument, Question } from './Model/modules.model';
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
  
    // Iterate through the questions in the DTO and map them to the `Question` schema
    questionDto.question.forEach((q) => {
      const newQuestion = {
        question: q.question,
        difficulty: q.difficulty,
        options: q.options,
        correctAnswer: q.correctAnswer,
        type: q.type,
        module_id: questionDto.module_id,
        course_id: q.course_id || module.course_id || null,
        title: q.title || null,
        content: q.content || null,
        resources: q.resources || [],
        created_at: q.created_at || new Date(),
      } as Question;
      
  
      // Add the question to the questionBank
      module.questionBank.push(newQuestion);
    });
  
    // Save the updated module
    return module.save();
  }
  
  async getModuleById(module_id: string): Promise<ModuleDocument> {
    const module = await this.moduleModel.findById(module_id).exec();
    if (!module) {
      throw new NotFoundException(`Module with ID ${module_id} not found`);
    }
    return module;
  }
  
  

}




