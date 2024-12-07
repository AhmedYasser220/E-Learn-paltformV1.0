import { Injectable , InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './Model/course.model';
import { UpdateCourseDto } from './dto/course.dto';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  // Update Course 
  async updateCourse(course_Id: string, updateData:UpdateCourseDto): Promise<Course> {
    try {
    // Fetch the course
    const course = await this.courseModel.findOne({ course_Id }).exec();
    if (!course) throw new NotFoundException(`Course with ID ${course_Id} not found`);

    // Save the current state as a version
    const currentVersion = {
      version_number: course.current_version,
      title: course.title,
      description: course.description,
      category: course.category,
      difficulty_level: course.difficulty_level,
      updated_by: updateData.updated_by || 'System', // Use provided 'updated_by' or default to 'System'
      updated_at: new Date(),
    };
    // ha push it to the array 
    course.versions.push(currentVersion);

    // Update the course with the new data
    Object.assign(course, updateData, {
      current_version: course.current_version + 1,
      updated_at: new Date(),
    });

    return course.save();
  } catch (error) {
    throw new InternalServerErrorException(
      `An error occurred while updating the course: ${error.message}`,
    );
  }
}

  // Get All Versions for a Course
  async getCourseVersions(course_Id: string): Promise<Course['versions']> {
    const course = await this.courseModel.findOne({ course_Id }).exec();
    if (!course) throw new NotFoundException(`Course with ID ${course_Id} not found`);
    return course.versions;
  }
}
