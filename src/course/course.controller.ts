/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { course } from './Model/course.model';
import { CreateCourseDto } from './dto/createCourse.dto';
import { UpdateCourseDto } from './dto/updateCourse.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Put(':id')
  async updateCourse(
    @Param('id') id: string,
    @Body() courseData: UpdateCourseDto,
  ): Promise<course> {
    try {
      const updatedCourse = await this.courseService.update(id, courseData);
      if (!updatedCourse) {
        throw new HttpException('course not found', HttpStatus.NOT_FOUND);
      }
      return updatedCourse;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  

  @Delete(':id')
  async deleteCourse(@Param('id') id: string): Promise<{ message: string }> {
    try {
      const deletedCourse = await this.courseService.delete(id);
      if (!deletedCourse) {
        throw new HttpException('course not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Course successfully deleted' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

@Post(':id/upload')
@UseInterceptors(FileInterceptor('file'))
async uploadFile(@Param('id') id:string ,@UploadedFile() file:Express.Multer.File ,@Body() body: any){
  console.log('Received file:', file);
  console.log('Request Body:', body);
  if(!file){
    throw new BadRequestException('No file uploaded');
  
  }
  const filePath = `uploads/${file.filename}`;
  await this.courseService.addMultimediaResource(id,filePath);
  return {message:'file uploaded succsesfully ',filePath};
}

}

