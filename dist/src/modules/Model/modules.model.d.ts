import { HydratedDocument } from 'mongoose';
export declare class Question {
    question: string;
    module_id: string;
    course_id: string;
    title: string;
    content: string;
    resources: string[];
    created_at: Date;
    type: string;
    difficulty: number;
}
export declare const QuestionSchema: import("mongoose").Schema<Question, import("mongoose").Model<Question, any, any, any, import("mongoose").Document<unknown, any, Question> & Question & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Question, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Question>> & import("mongoose").FlatRecord<Question> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export type QuestionDocument = HydratedDocument<Question>;
export declare class Module {
    module_id: string;
    course_id: string;
    title: string;
    content: string;
    resources: string[];
    created_at: Date;
    difficultyLevel: number;
    questionBank: Question[];
}
export declare const ModuleSchema: import("mongoose").Schema<Module, import("mongoose").Model<Module, any, any, any, import("mongoose").Document<unknown, any, Module> & Module & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Module, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Module>> & import("mongoose").FlatRecord<Module> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export type ModuleDocument = HydratedDocument<Module>;
