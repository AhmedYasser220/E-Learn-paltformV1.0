import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from './Models/user.model'; // Assuming a User schema exists
import { course } from 'src/course/Model/course.nodel';

@Injectable()
export class UserService {
  constructor(@InjectModel(user.name) private readonly userModel: Model<user>) {}

  async getAllStudents(): Promise<user[]> {
    return this.userModel.find({ role: 'student' }).exec();
  }

  async getAllInstructors(): Promise<user[]> {
    return this.userModel.find({ role: 'instructor' }).exec();
  }

  async searchStudents(filters: any): Promise<user[]> {
    const query = { role: 'student' };
    if (filters.name) query['name'] = { $regex: filters.name, $options: 'i' };

    return this.userModel.find(query).exec();
  }

  async searchInstructors(filters: any): Promise<user[]> {
    const query = { role: 'instructor' };
    if (filters.name) query['name'] = { $regex: filters.name, $options: 'i' };

    return this.userModel.find(query).exec();
  }

  async createCourse(userId: string, courseData: any) {
    // Find the user to ensure they exist
    const user = await this.userModel.findById(userId).exec();
    if (!user || user.role !== 'instructor') {
      throw new Error('Only instructors can create courses');
    }
    const newCourse = new this.userModel({
      ...courseData,
      created_by: userId, // Set the creator of the course
      created_at: new Date(),
    });
    const savedCourse = await newCourse.save();
    
    
  }
}