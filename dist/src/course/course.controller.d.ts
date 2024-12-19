import { CourseService } from './course.service';
import { UpdateCourseDto } from './dto/updateCourse.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    updateCourse(course_Id: string, updateData: UpdateCourseDto): Promise<import("./Model/course.model").Course>;
    getCourseVersions(course_Id: string): Promise<import("./Model/course.model").CourseVersion[]>;
}
