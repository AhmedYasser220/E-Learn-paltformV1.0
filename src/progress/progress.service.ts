import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { progress, progressDocument } from '../progress/Model/progress.model';
import { user } from '../user/Models/user.schema';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(user.name) private UserModel: Model<user>,
    @InjectModel('progress') private readonly progressModel: Model<progress>,
  ) {}

  // Get all progress documents
  async getAll() {
    return this.progressModel.find();
  }

  // Fetch progress by user ID
  async getProgressByUserId(_id: string): Promise<progressDocument> {
    console.log(_id);
    if (!Types.ObjectId.isValid(_id)) {
      throw new NotFoundException(`Invalid ID format: ${_id}`);
    }

    const progressData = await this.progressModel.findById(_id);
    console.log('progressData:', progressData);

    if (!progressData) {
      throw new NotFoundException(`No progress found for user ID ${_id}`);
    }

    return progressData;
  }

  // Fetch a single progress document by ID
  async getProgressById(id: string): Promise<progress> {
    const progressDoc = await this.progressModel
      .findById(id)
      .populate('userId', 'name email') // Populate user details
      .populate('courseId', 'name') // Populate course details
      .exec();

    if (!progressDoc) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }

    return progressDoc;
  }

  // Get student dashboard metrics
  async getStudentDashboardMetrics(userId: string): Promise<any> {
    const completedCourses = await this.progressModel
      .countDocuments({ userId, completion_percentage: { $gte: 100 } })
      .exec();

    const averageCompletion = await this.progressModel
      .aggregate([
        { $match: { userId } },
        { $group: { _id: null, average: { $avg: '$completion_percentage' } } },
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
}
