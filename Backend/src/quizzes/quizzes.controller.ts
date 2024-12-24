import { Controller, Post, Get, Param, Body, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { Roles , Role} from '../auth//decorators/roles.decorator'; 
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizService:QuizzesService) {} // Inject the QuizzesService to use its methods

  // Create quiz 
    @Roles(Role.Instructor)
    @Post()
   async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    const { module_id, userPerformance, questionCount, questionTypes } = createQuizDto;
  
    // Ensure all necessary parameters are provided
    if (!module_id || userPerformance === undefined || !questionCount || !questionTypes) {
      throw new Error('Missing required fields: module_id, userPerformance, questionCount, or questionTypes');
    }
  
    return this.quizService.createAdaptiveQuiz(
      module_id,
      userPerformance,
      questionCount,
      questionTypes,
    );
  }
  
 // Get all quizzes
 @Roles(Role.Admin, Role.Instructor)
//  @Get() 
 @Get('quizzes')// Adjusted to be a more specific base route
 async getQuizzes() {
   return this.quizService.getQuizzes();
 }

 // Get a quiz by ID
 @Roles(Role.Admin, Role.Instructor, Role.Student)
 @Get(':quiz_id')
 async getQuizById(@Param('quiz_id') quiz_id: string) {
   const quiz = await this.quizService.getQuizById(quiz_id);
   if (!quiz) {
     throw new Error(`Quiz with ID ${quiz_id} not found`);
   }
   return quiz;
 }

}

