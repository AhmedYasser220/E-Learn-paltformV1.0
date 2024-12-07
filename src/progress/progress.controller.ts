import { Response } from 'express';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { InstructorAnalyticsDto } from './dto/instructoranalytics.dto';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get('analytics/:instructorId')
  async getInstructorAnalytics(
    @Param('instructorId') instructorId: string,
  ): Promise<InstructorAnalyticsDto> {
    return this.progressService.getInstructorAnalytics(instructorId);
  }
  @Get('analytics/:instructorId/download')
  async downloadInstructorAnalytics(
    @Param('instructorId') instructorId: string,
    @Res() res: Response,
  ) {
    const analytics =
      await this.progressService.getInstructorAnalytics(instructorId);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=analytics.json');
    res.send(JSON.stringify(analytics, null, 2));
  }
}
