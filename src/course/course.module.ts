import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
<<<<<<< HEAD
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseSchema } from './Model/course.model';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]), // Register schema here
  ],
=======
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { course, CourseSchema } from './Model/course.nodel';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: course.name, schema: CourseSchema }]), // Register the schema
  ],
  controllers: [CourseController],
>>>>>>> origin/Abdullah
  providers: [CourseService],
})
export class CourseModule {}
