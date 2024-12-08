/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { course } from './Model/course.model';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dto/createCourse.dto';
import { UpdateCourseDto } from './dto/updateCourse.dto';


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

  async findAll(): Promise<course[]> {
    try {
      return await this.courseModel.find();
    } catch (error) {
      throw new Error('can not find courses');
    }
  }

  async findById(id: string): Promise<course> {
    try {
      const course = this.courseModel.findById(id);
      if (!course) {
        throw new NotFoundException('thid course can not be found');
      }
      return course;
    } catch (error) {
      throw new Error('Error retrieving the course');
    }
  }

  async update(id: string, updatedate: UpdateCourseDto): Promise<course> {
    try {
      const updatedCourse = this.courseModel.findByIdAndUpdate(id, updatedate, {
        new: true,
      });
      if (!updatedCourse) {
        throw new NotFoundException('course is not found ');
      }
      return updatedCourse;
    } catch (error) {
      throw new Error('Error updating the course');
    }
  }

async delete (id:string):Promise<course>{
  try{
    const deletedCourse = this.courseModel.findByIdAndDelete(id);
    if(!deletedCourse){
      throw new NotFoundException('course is not found');
    }
     
    return deletedCourse;
  }

catch(error){
throw new Error('error in deleting the course')
}

}

handleFileUpload(file: Express.Multer.File) {
  if (!file) {
    throw new BadRequestException('No file uploaded');
  }

  // Validate file type
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new BadRequestException('Invalid file type');
  }

  // Validate file size (e.g., max 5 MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new BadRequestException('File is too large!');
  }

  return { filePath: file.path };
}

async addMultimediaResource(courseId: string, filePath: string): Promise<void> {
  const course = await this.courseModel.findById(courseId);
  if (!course) {
    throw new NotFoundException('Course not found');
  }
course.multimedia_resources = course.multimedia_resources || [];
course.multimedia_resources.push(filePath);
await course.save();
}
}