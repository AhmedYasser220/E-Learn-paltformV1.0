import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async enrollInCourse(userId: string, courseId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { 
        $push: { 
          enrolledCourses: { 
            courseId, 
            enrollmentDate: new Date(),
            progress: 0 
          } 
        } 
      },
      { new: true }
    );
  }

  async updateCourseProgress(userId: string, courseId: string, progress: number) {
    return this.userModel.findOneAndUpdate(
      { _id: userId, 'enrolledCourses.courseId': courseId },
      { 
        $set: { 'enrolledCourses.$.progress': progress } 
      },
      { new: true }
    );
  }

  async getUserProfile(userId: string) {
    return this.userModel.findById(userId);
  }
}