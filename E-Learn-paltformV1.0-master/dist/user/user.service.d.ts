import { Model } from 'mongoose';
import { User, UserDocument } from './Models/user.model';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    create(user: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
    findAllByRole(role: string): Promise<User[]>;
    findById(userId: string): Promise<User | null>;
    update(userId: string, updates: Partial<User>): Promise<User | null>;
    delete(userId: string): Promise<User | null>;
}
export { UserDocument, User };
