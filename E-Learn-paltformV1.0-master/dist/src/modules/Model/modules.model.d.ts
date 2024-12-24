import Mongoose from "mongoose";
export declare class modules {
    module_id: String;
    course_id: String;
    title: String;
    content: String;
    resources: String[];
    created_at: Date;
}
export declare const modulesSchema: Mongoose.Schema<modules, Mongoose.Model<modules, any, any, any, Mongoose.Document<unknown, any, modules> & modules & {
    _id: Mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, Mongoose.DefaultSchemaOptions, modules, Mongoose.Document<unknown, {}, Mongoose.FlatRecord<modules>> & Mongoose.FlatRecord<modules> & {
    _id: Mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
