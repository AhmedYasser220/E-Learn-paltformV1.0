import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
export declare enum UserRole {
    ADMIN = "admin",
    STUDENT = "student",
    INSTRUCTOR = "instructor"
}
export declare class User {
    user_Id: string;
    name: string;
    email: string;
    password_hash: string;
    role: UserRole;
    profile_picture_url: string;
    created_at: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
