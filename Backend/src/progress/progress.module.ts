import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { course, CourseSchema } from 'src/course/Model/course.model';
import { user, UserSchema } from 'src/user/Models/user.schema';
import { progress, ProgressSchema } from './Model/progress.model';
import { responses, responsesSchema } from 'src/responses/Model/responses.model';
import { quizzes, QuizzesSchema } from 'src/quizzes/Model/quizzes.model';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: progress.name, schema: ProgressSchema },
      { name: course.name, schema: CourseSchema },
      { name: user.name, schema: UserSchema },
      {name:responses.name ,schema:responsesSchema},
      {name:quizzes.name ,schema:QuizzesSchema}
      

    ]),
  ],
  providers: [ProgressService],
  controllers: [ProgressController],
})
export class ProgressModule {}
