// progress.controller.ts
import { Response } from 'express';
import { Body, Controller, Get, Param, Post, Res, Put } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { InstructorAnalyticsDto } from './dto/instructoranalytics.dto';
import { CreateProgressDto } from './dto/create-progress.dto';
import { progress } from './Model/progress.model';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post('track')
  async trackProgress(@Body() createProgressDto: CreateProgressDto): Promise<progress> {
    return this.progressService.createOrUpdateProgress(createProgressDto);
  }

  // Get the progress of all courses for a user
  @Get('user/:userId')
  async getUserProgress(@Param('userId') userId: string): Promise<progress[]> {
    return this.progressService.getUserProgress(userId);
  }

  // Get the progress of a specific course for a user
  @Get('user/:userId/course/:courseId')
  async getCourseProgress(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ): Promise<progress | null> {
    return this.progressService.getCourseProgress(userId, courseId);
  }


  

  // Instructor Analytics and Download
  @Get('analytics/:instructorId')
  async getInstructorAnalytics(@Param('instructorId') instructorId: string): Promise<InstructorAnalyticsDto> {
    return this.progressService.getInstructorAnalytics(instructorId);
  }

  @Get('analytics/:instructorId/download')
  async downloadInstructorAnalytics(
    @Param('instructorId') instructorId: string,
    @Res() res: Response,
  ) {
    const analytics = await this.progressService.getInstructorAnalytics(instructorId);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=analytics.json');
    res.send(JSON.stringify(analytics, null, 2));
  }

  // Rate Progress
  @Put('rate/:progressId')
  async rateProgress(
    @Param('progressId') progressId: string,
    @Body() updateData: UpdateProgressDto,
  ): Promise<progress> {
    return this.progressService.updateProgress(progressId, updateData);
  }

// progress.controller.ts
@Get('user/:userId/completed')
async getCompletedCourses(
  @Param('userId') userId: string,
): Promise<progress[]> {
  return this.progressService.getCompletedCourses(userId);
}



}


