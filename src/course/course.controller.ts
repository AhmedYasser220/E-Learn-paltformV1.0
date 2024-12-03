import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { course } from './Model/course.model';
import { CreateCourseDto } from './dto/createCourse.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @Post()
  async createCourse(@Body() courseData: CreateCourseDto): Promise<course> {
    try {
      return await this.courseService.create(courseData);
    } catch (error) {
      throw new HttpException(
        'Failed to create course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAllCourses(): Promise<course[]> {
    try {
      return await this.courseService.findAll();
    } catch (error) {
      throw new HttpException(
        'Failed to retrive courses',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getCourseById(@Param('id') id: string): Promise<course> {
    try {
      const course = await this.courseService.findById(id);
      if (!course) {
        throw new HttpException(
          'thid course can not be found',
          HttpStatus.NOT_FOUND,
        );
      }
      return course;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
