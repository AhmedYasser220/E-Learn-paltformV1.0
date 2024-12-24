// feedback.controller.ts
import { Controller, Post, Param, Body } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('quiz/:quizId')
  async getRealTimeFeedback(
    @Param('quizId') quizId: string,
    @Body('submittedAnswers') submittedAnswers: any[],
  ) {
    return this.feedbackService.getRealTimeFeedback(quizId, submittedAnswers);
  }
}