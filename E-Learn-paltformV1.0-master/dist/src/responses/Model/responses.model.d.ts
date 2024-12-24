import Mongoose from "mongoose";
export declare class responses {
    response_id: String;
    user_id: String;
    quiz_id: String;
    answers: Object[];
    score: Number;
    submitted_at: Date;
}
export declare const responsesSchema: Mongoose.Schema<responses, Mongoose.Model<responses, any, any, any, Mongoose.Document<unknown, any, responses> & responses & {
    _id: Mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, Mongoose.DefaultSchemaOptions, responses, Mongoose.Document<unknown, {}, Mongoose.FlatRecord<responses>> & Mongoose.FlatRecord<responses> & {
    _id: Mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
