// profile.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { progress, progressDocument } from '../Progress/Model/progress.model';

@Injectable()
export class ProfileService {
  // constructor(
  //   @InjectModel(Progress.name) private readonly progressModel: Model<typeof Progress>,
  // ) {}
  constructor(
    @InjectModel(progress.name) private progressModel: Model<progressDocument>,
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
    
    // Calculate average score
   
  }
}