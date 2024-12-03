import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { course, CourseSchema } from './Model/course.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: course.name, schema: CourseSchema }]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
