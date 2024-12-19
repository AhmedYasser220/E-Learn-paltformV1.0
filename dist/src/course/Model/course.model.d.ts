import { HydratedDocument } from 'mongoose';
export declare class CourseVersion {
    version_number: number;
    title: string;
    description: string;
    category: string;
    difficulty_level: string;
    updated_by: string;
    updated_at: Date;
}
export declare class Course {
    course_Id: string;
    title: string;
    description: string;
    category: string;
    difficulty_level: string;
    created_by: string;
    created_at: Date;
    updated_at: Date;
    current_version: number;
    versions: CourseVersion[];
}
export declare const CourseSchema: import("mongoose").Schema<Course, import("mongoose").Model<Course, any, any, any, import("mongoose").Document<unknown, any, Course> & Course & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Course, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Course>> & import("mongoose").FlatRecord<Course> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export type CourseDocument = HydratedDocument<Course>;
