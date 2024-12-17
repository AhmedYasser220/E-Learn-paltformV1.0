import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { progress, progressDocument } from '../Progress/Model/progress.model'

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(progress.name) private readonly progressModel: Model<progressDocument>,
  ) {}

  // Calculate completion rate for a specific user
  async getCompletionRate(userId: string): Promise<number> {
    const totalCourses = await this.progressModel.countDocuments({ user_id: userId }).exec();

    const completedCourses = await this.progressModel
      .countDocuments({ user_id: userId, completion_percentage: { $gte: 100 } })
      .exec();

    if (totalCourses === 0) {
      return 0; // Avoid division by zero
    }

    const completionRate = (completedCourses / totalCourses) * 100;
    return parseFloat(completionRate.toFixed(2)); // Return as a percentage with 2 decimals
  }

  // Calculate average completion percentage for a user across all courses
  async getAverageScore(userId: string): Promise<number> {
    const result = await this.progressModel
      .aggregate([
        { $match: { user_id: userId } },
        {
          $group: {
            _id: '$user_id',
            averageCompletion: { $avg: '$completion_percentage' },
          },
        },
      ])
      .exec();

    if (result.length === 0) {
      return 0; // No progress data
    }

    return parseFloat(result[0].averageCompletion.toFixed(2));
  }

  // Calculate total engagement (total courses interacted with by the user)
  async getEngagementCount(userId: string): Promise<number> {
    const totalEngagement = await this.progressModel
      .countDocuments({ user_id: userId })
      .exec();

    return totalEngagement;
  }

  // Student Dashboard Metrics
  async getStudentDashboardMetrics(userId: string): Promise<any> {
    const completionRate = await this.getCompletionRate(userId);
    const averageCompletion = await this.getAverageScore(userId);
    const engagementCount = await this.getEngagementCount(userId);

    return {
      completionRate: `${completionRate}%`,
      averageCompletion: `${averageCompletion}%`,
      totalEngagements: engagementCount,
    };
  }
}
