import Mongoose from "mongoose";
export declare class quizzes {
    quiz_id: String;
    module_id: String;
    questions: Object[];
    created_at: Date;
}
export declare const QuizzesSchema: Mongoose.Schema<quizzes, Mongoose.Model<quizzes, any, any, any, Mongoose.Document<unknown, any, quizzes> & quizzes & {
    _id: Mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, Mongoose.DefaultSchemaOptions, quizzes, Mongoose.Document<unknown, {}, Mongoose.FlatRecord<quizzes>> & Mongoose.FlatRecord<quizzes> & {
    _id: Mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
