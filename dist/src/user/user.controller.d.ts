import { UserService } from './user.service';
import { user } from './models/user.schema';
import { createUserDTo } from './Dtos/createUser.dto';
import { updateUserDTo } from './Dtos/updateUser.dto';
export declare class UserController {
    private studentService;
    constructor(studentService: UserService);
    getAllStudents(): Promise<user[]>;
    getCurrentUser({ user }: {
        user: any;
    }): Promise<user>;
    getStudentById(id: string): Promise<user>;
    createStudent(usertData: createUserDTo): Promise<import("mongoose").Document<unknown, {}, user> & user & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateStudent(id: string, studentData: updateUserDTo): Promise<import("mongoose").Document<unknown, {}, user> & user & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteStudent(id: string): Promise<import("mongoose").Document<unknown, {}, user> & user & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    viewProfile({ user }: {
        user: any;
    }): Promise<user>;
    updateProfile({ user }: {
        user: any;
    }, updateData: updateUserDTo): Promise<import("mongoose").Document<unknown, {}, user> & user & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
