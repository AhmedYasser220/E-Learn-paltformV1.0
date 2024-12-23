import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('students')
  async getAllStudents() {
    return this.userService.getAllStudents();
  }

  @Get('instructors')
  async getAllInstructors() {
    return this.userService.getAllInstructors();
  }

  @Get('students/search')
  async searchStudents(@Query() filters: any) {
    return this.userService.searchStudents(filters);
  }

  @Get('instructors/search')
  async searchInstructors(@Query() filters: any) {
    return this.userService.searchInstructors(filters);
  }
  @Post('courses')
  async createCourse(@Body() courseData: any, @Query('userId') userId: string) {
    return this.userService.createCourse(userId, courseData);
  }
}

