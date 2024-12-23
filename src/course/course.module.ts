import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseService } from './course.service';
import { Course, CourseSchema } from './Model/course.model';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]), // Register schema here
  ],
  providers: [CourseService],
})
export class CourseModule {}