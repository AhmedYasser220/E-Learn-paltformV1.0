import { Controller, Put, Get, Param, Body, Query ,InternalServerErrorException, BadRequestException, Post, HttpException, HttpStatus, Delete, UploadedFile, UseInterceptors,} from '@nestjs/common';
import { CourseService } from './course.service';
import { UpdateCourseDto } from './dto/updateCourse.dto';
import { Course } from './Model/course.model';
import { Roles , Role} from '../auth//decorators/roles.decorator'; 
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateCourseDto } from './dto/createCourse.dto';
import { FileInterceptor } from '@nestjs/platform-express';
//import { RolesGuard } from '../auth/guards/authorization.guard'; 

@ApiTags('Courses')

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}


  @Post()
  async createCourse(@Body() courseData: CreateCourseDto): Promise<Course> {
    try {
      return await this.courseService.create(courseData);
    } catch (error) {
      throw new HttpException(
        'Failed to create course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  @Get(':course_Id')
  async getCourseById(@Param('course_Id') course_Id: string): Promise<Course> {
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


   
  // Update a Course
  @Roles(Role.Admin, Role.Instructor)
  @Put(':course_Id')
  @ApiOperation({summary:' Update a Course'})
  async updateCourse(
    @Param('course_Id') course_Id: string,
    @Body() updateData: UpdateCourseDto, 
  ) {
    try {
      return await this.courseService.updateCourse(course_Id, updateData);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update course');
    }
  }

  // Get Course Versions
  @Roles(Role.Admin, Role.Instructor)
  @Get(':course_Id/versions')
  async getCourseVersions(@Param('course_Id') course_Id: string) {
    try {
      return await this.courseService.getCourseVersions(course_Id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch course versions');
    }
  }
  @Get('/courses')
  @Roles(Role.Admin, Role.Instructor, Role.Student)
  async getAllCourses() {
    try {
      return await this.courseService.getAllCourses();
    } catch (error) {
      throw new InternalServerErrorException('Falied to load courses')
    }
  }
}
