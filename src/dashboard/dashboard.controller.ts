// dashboard.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('completion-rate/:studentId')
  async getCompletionRate(@Param('studentId') studentId: string): Promise<{ completionRate: number }> {
    const completionRate = await this.dashboardService.getCompletionRate(studentId);
    return { completionRate };
  }

  @Get('average-score/:studentId')
  async getAverageScore(@Param('studentId') studentId: string): Promise<{ averageScore: number }> {
    const averageScore = await this.dashboardService.getAverageScore(studentId);
    return { averageScore };
  }

  @Get('engagement-trends/:studentId')
  async getEngagementTrends(@Param('studentId') studentId: string): Promise<{ trends: any }> {
    const trends = await this.dashboardService.getEngagementTrends(studentId);
    return { trends };
  }
}
