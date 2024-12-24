import { Controller, Patch, Get, Body, Param } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { GetProgressDto } from './dto/get-progress.dto';
import { Progress } from './Model/progress.model';

@Controller('progress')
export class ProgressController {
  progressModel: any;
  constructor(private readonly progressService: ProgressService) {}

  // Track or update progress of a course for a user
  @Patch('track')
  async trackProgress(@Body() createProgressDto: CreateProgressDto): Promise<Progress> {
    return this.progressService.createOrUpdateProgress(createProgressDto);
  }

  // Get the progress of all courses for a user
  @Get('user/:userId')
  async getUserProgress(@Param('userId') userId: string): Promise<Progress[]> {
    return this.progressService.getUserProgress(userId);
  }

  // Get the progress of a specific course for a user
  @Get('user/:userId/course/:courseId')
  async getCourseProgress(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ): Promise<Progress | null> {
    return this.progressService.getCourseProgress(userId, courseId);
  }
  @Get('student-dashboard/:userId')
  async getStudentDashboardMetrics(@Param('userId') userId: string) {
    return await this.progressService.getStudentDashboardMetrics(userId);
  }
  @Get('user/:userId/completed')
  async getCompletedCourses(
    @Param('userId') userId: string,
  ): Promise<Progress[]> {
    return this.progressService.getCompletedCourses(userId);
  }
}