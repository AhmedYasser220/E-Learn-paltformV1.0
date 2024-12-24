import { UserService } from './user.service';
import { User } from './Models/user.model';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(user: Partial<User>): Promise<User | {
        error: string;
    }>;
    findAll(body: {
        role?: string;
    }): Promise<User[] | {
        error: string;
    }>;
    findOne(id: string): Promise<User>;
    update(id: string, updates: Partial<User>): Promise<User | {
        error: string;
    }>;
    remove(id: string): Promise<User>;
}
