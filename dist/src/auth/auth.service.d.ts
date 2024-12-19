import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { RegisterRequestDto } from './dto/RegisterRequestDto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(user: RegisterRequestDto): Promise<string>;
    signIn(email: string, password: string): Promise<{
        access_token: string;
        payload: {
            userid: Types.ObjectId;
            role: string;
        };
    }>;
}
