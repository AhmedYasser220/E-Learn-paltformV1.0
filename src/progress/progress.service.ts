import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Progress } from './Model/progress.model';
import { CreateProgressDto } from './dto/create-progress.dto';

@Injectable()
export class ProgressService {
  constructor(@InjectModel(Progress.name) private progressModel: Model<Progress>) {}

  // Create or update progress for a user on a course
  async createOrUpdateProgress(createProgressDto: CreateProgressDto): Promise<Progress> {
    const { userId, courseId, progress, completedAt } = createProgressDto;

    // Check if progress record already exists
    const existingProgress = await this.progressModel.findOne({ userId, courseId });

    if (existingProgress) {
      // Update the existing progress record
      existingProgress.progress = progress;
      existingProgress.completedAt = completedAt;
      return existingProgress.save();
    } else {
      // Create a new progress record
      const newProgress = new this.progressModel(createProgressDto);
      return newProgress.save();
    }
  }

  // Get the user's progress in all courses
  async getUserProgress(userId: string): Promise<Progress[]> {
    return this.progressModel.find({ userId }).exec();
  }

  // Get progress for a specific course of a user
  async getCourseProgress(userId: string, courseId: string): Promise<Progress | null> {
    return this.progressModel.findOne({ userId, courseId }).exec();
  }
  async getStudentDashboardMetrics(userId: string): Promise<any> {
    const completedCourses = await this.progressModel
      .countDocuments({ userId, progress: { $gte: 100 } })
      .exec();

    const averageCompletion = await this.progressModel
      .aggregate([
        { $match: { userId } },
        { $group: { _id: null, average: { $avg: '$progress' } } },
      ])
      .exec();

    const totalEngagements = await this.progressModel
      .countDocuments({ userId })
      .exec();

    return {
      completionRate: completedCourses,
      averageCompletion: averageCompletion.length ? averageCompletion[0].average : 0,
      totalEngagements,
    };
  }
  async getCompletedCourses(userId: string): Promise<Progress[]> {
    return this.progressModel.find({ userId, completion_percentage: 100 }).exec();
  }
}
