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
  Query,
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

  @Get(':course_Id')
  async getCourseById(@Param('course_Id') course_Id: string): Promise<course> {
    try {
      const course = await this.courseService.findById(course_Id);
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

  @Put(':course_Id')
  async updateCourse(
    @Param('course_Id') course_Id: string,
    @Body() courseData: UpdateCourseDto,
  ): Promise<course> {
    try {
      const updatedCourse = await this.courseService.update(
        course_Id,
        courseData,
      );
      if (!updatedCourse) {
        throw new HttpException('course not found', HttpStatus.NOT_FOUND);
      }
      return updatedCourse;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':course_Id')
  async deleteCourse(
    @Param('course_Id') course_Id: string,
  ): Promise<{ message: string }> {
    try {
      const deletedCourse = await this.courseService.delete(course_Id);
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
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    console.log('Received file:', file);
    console.log('Request Body:', body);
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const filePath = `uploads/${file.filename}`;
    await this.courseService.addMultimediaResource(id, filePath);
    return { message: 'file uploaded succsesfully ', filePath };
  }

 // Flag a resource as outdated
 @Put(':courseId/resources/outdated')
 //@UseGuards(AuthGuard, RolesGuard)
 //@Roles(Role.Instructor)
 async flagResourceAsOutdated(
   @Param('courseId') courseId: string,
   @Body('resourcePath') resourcePath: string,
 ): Promise<void> {
   try {
     await this.courseService.flagResourceAsOutdated(courseId, resourcePath);
   } catch (error) {
     throw new BadRequestException(error.message);
   }
 }

 // Get multimedia resources for a course based on user role
 @Get(':courseId/resources')
 //@UseGuards(AuthGuard)
 async getMultimediaResources(
   @Param('courseId') courseId: string,
   @Query('role') userRole: string, // Role can be 'student' or 'instructor'
 ): Promise<{ filePath: string; isOutdated: boolean }[]> {
   if (!['student', 'instructor'].includes(userRole)) {
     throw new BadRequestException('Invalid role provided');
   }
   return await this.courseService.getMultimediaResources(courseId, userRole);
 }
}



