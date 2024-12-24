import Mongoose from "mongoose";
export declare class progress {
    progress_id: String;
    user_id: String;
    course_id: String;
    completion_percentage: Number;
    last_accessed: Date;
}
export declare const progressSchema: Mongoose.Schema<progress, Mongoose.Model<progress, any, any, any, Mongoose.Document<unknown, any, progress> & progress & {
    _id: Mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, Mongoose.DefaultSchemaOptions, progress, Mongoose.Document<unknown, {}, Mongoose.FlatRecord<progress>> & Mongoose.FlatRecord<progress> & {
    _id: Mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
