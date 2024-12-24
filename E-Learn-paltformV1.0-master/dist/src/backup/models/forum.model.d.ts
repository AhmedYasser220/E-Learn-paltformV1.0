import { Document } from 'mongoose';
export declare class ForumThread extends Document {
    title: string;
    courseId: string;
    authorId: string;
    replies: Array<{
        body: string;
        authorId: string;
        createdAt: Date;
    }>;
}
export declare const ForumThreadSchema: import("mongoose").Schema<ForumThread, import("mongoose").Model<ForumThread, any, any, any, Document<unknown, any, ForumThread> & ForumThread & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ForumThread, Document<unknown, {}, import("mongoose").FlatRecord<ForumThread>> & import("mongoose").FlatRecord<ForumThread> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
