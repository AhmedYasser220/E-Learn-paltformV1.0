import { Controller, Get, Param } from '@nestjs/common';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  // Fetch all progress records for a specific user ID
  @Get('user/:userId')
  async getProgressByUserId(@Param('userId') userId: string) {
    return await this.progressService.getProgressByUserId(userId);
  }

  // Fetch a single progress record by progress ID
  @Get(':id')
  async getProgressById(@Param('id') id: string) {
    return await this.progressService.getProgressById(id);
  }

  // Fetch student dashboard metrics for a specific user ID
  @Get('student-dashboard/:userId')
  async getStudentDashboardMetrics(@Param('userId') userId: string) {
    return await this.progressService.getStudentDashboardMetrics(userId);
  }
}
