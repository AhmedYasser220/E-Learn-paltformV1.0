import { Controller, Put, Get, Param, Body ,Query,InternalServerErrorException,} from '@nestjs/common';
import { CourseService } from './course.service';
import { UpdateCourseDto } from './dto/updatedCourse.dto';
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // Update a Course
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
  @Get('search')
  async searchCourses(@Query() filters: any) {
    return this.courseService.searchCourses(filters);
  }
  // Get Course Versions
  @Get(':course_Id/versions')
  async getCourseVersions(@Param('course_Id') course_Id: string) {
    try {
      return await this.courseService.getCourseVersions(course_Id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch course versions');
    }
  }z
}