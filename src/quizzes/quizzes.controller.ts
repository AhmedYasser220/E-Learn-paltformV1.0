import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/createQuiz.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizService:QuizzesService) {} // Inject the QuizzesService to use its methods

  @Post()

  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createAdaptiveQuiz(
      createQuizDto.module_id,
      createQuizDto.userPerformance,
    );
  }

  @Get(':quiz_id')
  async getQuizById(@Param('quiz_id') quiz_id: string) {
  const quiz = await this.quizService.getQuizById(quiz_id);
  if (!quiz) {
    throw new Error(`Quiz with ID ${quiz_id} not found`);
  }
  return quiz;
}

}
