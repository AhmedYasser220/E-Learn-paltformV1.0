import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { course } from './Model/course.model';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dto/createCourse.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(course.name) private readonly courseModel: Model<course>,
  ) {}
  async create(courseData: CreateCourseDto): Promise<course> {
    try {
      const newCourse = new this.courseModel(courseData);
      const savedCourse = await newCourse.save();
      return savedCourse.toObject();
    } catch (error) {
      console.error('Error saving course:', error);
      throw new Error('error creating course !!');
    }
  }
}
