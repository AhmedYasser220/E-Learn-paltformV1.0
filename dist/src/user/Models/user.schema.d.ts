import { Document, HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<user>;
export declare class user {
    name: string;
    email: string;
    password: string;
    role: string;
    profile_picture_url: string;
    created_at: Date;
}
export declare const UserSchema: import("mongoose").Schema<user, import("mongoose").Model<user, any, any, any, Document<unknown, any, user> & user & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, user, Document<unknown, {}, import("mongoose").FlatRecord<user>> & import("mongoose").FlatRecord<user> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
