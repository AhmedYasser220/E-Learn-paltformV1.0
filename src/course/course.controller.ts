import { Controller, Put, Get, Param, Body } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // Update a Course
  @Put(':course_Id')
  async updateCourse(
    @Param('course_Id') course_Id: string,
    @Body() updateData: Record<string, any>, // Accept dynamic updates
  ) {
    return this.courseService.updateCourse(course_Id, updateData);
  }

  // Get Course Versions
  @Get(':course_Id/versions')
  async getCourseVersions(@Param('course_Id') course_Id: string) {
    return this.courseService.getCourseVersions(course_Id);
  }
}
