import { Model } from 'mongoose';
import { Course, CourseDocument } from './Model/course.model';
import { UpdateCourseDto } from './dto/updateCourse.dto';
export declare class CourseService {
    private courseModel;
    constructor(courseModel: Model<CourseDocument>);
    updateCourse(course_Id: string, updateData: UpdateCourseDto): Promise<Course>;
    getCourseVersions(course_Id: string): Promise<Course['versions']>;
}
