// dashboard.module.ts
import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service'
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { progress, progressSchema } from '../Progress/Model/progress.model';
import { course, CourseSchema } from '../course/Model/course.nodel';
import { modules, modulesSchema } from '../modules/Model/modules.model';
import { quizzes, QuizzesSchema } from '../quizzes/Model/quizzes.model'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: progress.name, schema: progressSchema },
      { name: course.name, schema: CourseSchema },
      { name: modules.name, schema: modulesSchema },
      { name: quizzes.name, schema: QuizzesSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}