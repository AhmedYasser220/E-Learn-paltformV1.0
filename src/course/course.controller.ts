import { Controller, Get, Query } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('search')
  async searchCourses(@Query() filters: any) {
    return this.courseService.searchCourses(filters);
  }
}

