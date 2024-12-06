import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController { constructor(private readonly userService: UserService) {}

@Post('track-course')
trackCompletedCourse(
  @Body('userId') userId: string,
  @Body('courseId') courseId: string,
) {
  return this.userService.trackCompletedCourse(userId, courseId);
}}
