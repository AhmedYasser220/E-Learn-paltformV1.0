import { Controller, Put, Get, Param, Body ,InternalServerErrorException, BadRequestException, Post, HttpException, HttpStatus, Delete, UploadedFile, UseInterceptors,} from '@nestjs/common';
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



  // hannah
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


  // @Get(':id')
  // async getCourseById(@Param('id') id: string): Promise<Course> {
  //   try {
  //     const course = await this.courseService.findById(id);
  //     if (!course) {
  //       throw new HttpException(
  //         'thid course can not be found',
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }
  //     return course;
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }
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

//// Hannah 


   
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
