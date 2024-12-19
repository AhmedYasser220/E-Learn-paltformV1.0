import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { progress, progressDocument } from '../progress/Model/progress.model';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(progress.name) private readonly progressModel: Model<progressDocument>,
  ) {}

  // Fetch all progress for a specific user ID
  async getProgressByUserId(userId: string): Promise<progress[]> {
    const progressData = await this.progressModel
      .find({ user_id: userId })
      .populate('course_id', 'name description') // Populate course details
      .exec();

    if (!progressData.length) {
      throw new NotFoundException(`No progress found for user ID ${userId}`);
    }

    return progressData;
  }

  // Fetch a single progress document by ID
  async getProgressById(id: string): Promise<progress> {
    const progressDoc = await this.progressModel
      .findById(id)
      .populate('user_id', 'name email') // Populate user details
      .populate('course_id', 'name') // Populate course details
      .exec();

    if (!progressDoc) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }

    return progressDoc;
  }

  // Get student dashboard metrics
  async getStudentDashboardMetrics(userId: string): Promise<any> {
    const completedCourses = await this.progressModel
      .countDocuments({ user_id: userId, completion_percentage: { $gte: 100 } })
      .exec();

    const averageCompletion = await this.progressModel
      .aggregate([
        { $match: { user_id: userId } },
        { $group: { _id: null, average: { $avg: '$completion_percentage' } } },
      ])
      .exec();

    const totalEngagements = await this.progressModel
      .countDocuments({ user_id: userId })
      .exec();

    return {
      completionRate: completedCourses,
      averageCompletion: averageCompletion.length ? averageCompletion[0].average : 0,
      totalEngagements,
    };
  }
}
