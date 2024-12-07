import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { course, CourseSchema } from 'src/course/Model/course.model';
import { user, UserSchema } from 'src/user/Models/user.model';
import { progress, progressSchema } from './Model/progress.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: progress.name, schema: progressSchema },
      { name: course.name, schema: CourseSchema },
      { name: user.name, schema: UserSchema },
    ]),
  ],
  providers: [ProgressService],
  controllers: [ProgressController],
})
export class ProgressModule {}
