import { BadRequestException, Injectable , InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { Course, CourseDocument } from './Model/course.model';
import { UpdateCourseDto } from './dto/updateCourse.dto';
import { CreateCourseDto } from './dto/createCourse.dto';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}


/// hannah 
async create(courseData: CreateCourseDto): Promise<Course> {
  try {
    const newCourse = new this.courseModel(courseData);
    const savedCourse = await newCourse.save();
    return savedCourse.toObject();
  } catch (error) {
    console.error('Error saving course:', error);
    throw new Error('error creating course !!');
  }
}

async findAll(): Promise<Course[]> {
  try {
    return await this.courseModel.find();
  } catch (error) {
    throw new Error('can not find courses');
  }
}

async findById(id: string): Promise<Course> {
  try {
    const course = this.courseModel.findById(id);
    if (!course) {
      throw new NotFoundException('thid course can not be found');
    }
    return course;
  } catch (error) {
    throw new Error('Error retrieving the course');
  }
}

async delete (id:string):Promise<Course>{
  try{
    const deletedCourse = this.courseModel.findByIdAndDelete(id);
    if(!deletedCourse){
      throw new NotFoundException('course is not found');
    }
     
    return deletedCourse;
  }

catch(error){
throw new Error('error in deleting the course')
}

}

handleFileUpload(file: Express.Multer.File) {
  if (!file) {
    throw new BadRequestException('No file uploaded');
  }

  // Validate file type
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new BadRequestException('Invalid file type');
  }

  // Validate file size (e.g., max 5 MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new BadRequestException('File is too large!');
  }

  return { filePath: file.path };
}

async addMultimediaResource(courseId: string, filePath: string): Promise<void> {
  const course = await this.courseModel.findById(courseId);
  if (!course) {
    throw new NotFoundException('Course not found');
  }
course.multimedia_resources = course.multimedia_resources || [];
course.multimedia_resources.push(filePath);
await course.save();
}

//////////////////Hannah 

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

  async getAllCourses(): Promise<Course[]> {
    const course = this.courseModel.find().exec(); // Fetch all courses
   // console.log(course);
    if(!course) throw new NotFoundException("No courses Avalible - Back");
    return course;
  }
}
