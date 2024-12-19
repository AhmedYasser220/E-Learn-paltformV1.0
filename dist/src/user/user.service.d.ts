import { Model } from 'mongoose';
import { user, UserDocument } from 'src/user/Models/user.schema';
import { updateUserDTo } from './Dtos/updateUser.dto';
export declare class UserService {
    private UserModel;
    constructor(UserModel: Model<user>);
    create(studentData: user): Promise<UserDocument>;
    findByName(username: string): Promise<UserDocument>;
    findByEmail(email: string): Promise<UserDocument>;
    findAll(): Promise<UserDocument[]>;
    findById(id: string): Promise<UserDocument>;
    update(id: string, updateData: updateUserDTo): Promise<UserDocument>;
    delete(id: string): Promise<UserDocument>;
    viewProfile(id: string): Promise<UserDocument>;
    updateProfile(id: string, updateData: updateUserDTo): Promise<UserDocument>;
}
