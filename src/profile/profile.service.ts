// profile.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Progress, ProgressDocument } from '../Progress/Model/progress.model';

@Injectable()
export class ProfileService {
  // constructor(
  //   @InjectModel(Progress.name) private readonly progressModel: Model<typeof Progress>,
  // ) {}
  constructor(
    @InjectModel(Progress.name) private progressModel: Model<ProgressDocument>,
  ) {}

  /**
   * User Profile Management API
   * Calculates the user's average score
   */
  async getUserAverageScore(userId: string): Promise<any> {
    // Query the progress records
    const progressRecords = await this.progressModel.find({ user_id: userId }).exec();

    // Handle case when no records are found
    if (!progressRecords.length) {
      throw new NotFoundException('No progress records found for the user');
    }

    // Calculate total completion percentage
    const totalCompletion = progressRecords.reduce(
      (acc, record) => acc + record.completion_percentage,
      0,
    );

    // Calculate average score
    const averageScore = totalCompletion / progressRecords.length;

    return {
      userId,
      totalCourses: progressRecords.length,
      averageScore: averageScore.toFixed(2),
    };
  }
  }