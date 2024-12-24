import Mongoose from "mongoose";
export declare class course {
    course_Id: String;
    title: String;
    description: String;
    category: String;
    difficulty_level: String;
    created_by: String;
    created_at: Date;
}
export declare const CourseSchema: Mongoose.Schema<course, Mongoose.Model<course, any, any, any, Mongoose.Document<unknown, any, course> & course & {
    _id: Mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, Mongoose.DefaultSchemaOptions, course, Mongoose.Document<unknown, {}, Mongoose.FlatRecord<course>> & Mongoose.FlatRecord<course> & {
    _id: Mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
