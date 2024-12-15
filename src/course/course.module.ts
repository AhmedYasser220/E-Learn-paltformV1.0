import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { course, CourseSchema } from './Model/course.nodel';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: course.name, schema: CourseSchema }]), // Register the schema
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
