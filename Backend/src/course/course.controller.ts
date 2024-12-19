import { Controller, Put, Get, Param, Body ,InternalServerErrorException,} from '@nestjs/common';
import { CourseService } from './course.service';
import { UpdateCourseDto } from './dto/updateCourse.dto';
import { Course } from './Model/course.model';
import { Roles , Role} from '../auth//decorators/roles.decorator'; 
//import { RolesGuard } from '../auth/guards/authorization.guard'; 

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // Update a Course
  @Roles(Role.Admin, Role.Instructor)
  @Put(':course_Id')
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
  async getAllCourses(): Promise<Course[]> {
    try {
      return await this.courseService.getAllCourses();
    } catch (error) {
      throw new InternalServerErrorException('Falied to load courses')
    }
  }
}
