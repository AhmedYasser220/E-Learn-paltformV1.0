import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseSchema } from './Model/course.model';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]), // Register schema here
  ],
  providers: [CourseService],
  controllers: [CourseController]
})
export class CourseModule {}
