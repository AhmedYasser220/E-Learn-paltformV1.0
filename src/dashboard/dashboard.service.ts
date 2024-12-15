// dashboard.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Progress } from '../Progress/Model/progress.model';
import { course } from '../course/Model/course.nodel';
import { modules } from '../modules/Model/modules.model';
import { quizzes } from '../quizzes/Model/quizzes.model';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Progress.name) private progressModel: Model<Progress>,
    @InjectModel(course.name) private courseModel: Model<course>,
    @InjectModel(modules.name) private modulesModel: Model<modules>,
    @InjectModel(quizzes.name) private quizzesModel: Model<quizzes>,
  ) {}

  // Calculate course completion rate for a student
  async getCompletionRate(studentId: string): Promise<number> {
    const progressRecords = await this.progressModel.find({ user_id: studentId });
    if (!progressRecords.length) return 0;

    const totalCompletion = progressRecords.reduce(
        (acc, record) => acc + Number(record.completion_percentage),
        0
      );
      
    return totalCompletion / progressRecords.length;
  }
  

  // Calculate average quiz score for a student
  async getAverageScore(studentId: string): Promise<number> {
    // Fetch progress records for the student
    const progressRecords = await this.progressModel.find({ user_id: studentId });
    if (!progressRecords.length) return 0;
  
    // Fetch all quizzes
    const quizzesList = await this.quizzesModel.find(); // Fetch all quiz documents
    if (!quizzesList.length) return 0;
  
    // Calculate total number of questions
    const totalQuestions = quizzesList.reduce((acc, quiz) => acc + quiz.questions.length, 0);
  
    // Placeholder logic for average score
    const averageScore = totalQuestions / quizzesList.length;
  
    return averageScore; // Return the average score
  }
  
 
   // Calculate engagement trends (e.g., number of accesses over time)
   async getEngagementTrends(studentId: string): Promise<any> {
     const progressRecords = await this.progressModel.find({ user_id: studentId });
     if (!progressRecords.length) return [];
 
     const trends = progressRecords.map((record) => ({
       course_id: record.course_id,
       last_accessed: record.last_accessed,
     }));
 
     return trends;
   }
 }