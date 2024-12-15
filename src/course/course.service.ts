import { course } from './Model/course.nodel';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class CourseService {
  constructor(@InjectModel(course.name) private readonly courseModel: Model<course>) {}

  async searchCourses(filters: any): Promise<course[]> {
    const query = {};
    if (filters.title) query['title'] = { $regex: filters.title, $options: 'i' }; // Case-insensitive search
    if (filters.category) query['category'] = filters.category;
    if (filters.difficulty_level) query['difficulty_level'] = filters.difficulty_level;

    return this.courseModel.find(query).exec();
  }
}
