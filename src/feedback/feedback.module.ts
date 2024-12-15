// feedback.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { quizzes, QuizzesSchema } from '../quizzes/Model/quizzes.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: quizzes.name, schema: QuizzesSchema }]),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}

