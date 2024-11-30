import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('enroll')
  enrollInCourse(
    @Body('userId') userId: string,
    @Body('courseId') courseId: string
  ) {
    return this.userService.enrollInCourse(userId, courseId);
  }

  @Post('progress')
  updateCourseProgress(
    @Body('userId') userId: string,
    @Body('courseId') courseId: string,
    @Body('progress') progress: number
  ) {
    return this.userService.updateCourseProgress(userId, courseId, progress);
  }

  @Get('profile/:userId')
  getUserProfile(@Param('userId') userId: string) {
    return this.userService.getUserProfile(userId);
  }
}