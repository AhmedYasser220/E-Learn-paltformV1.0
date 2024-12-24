import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ObjectId, Types } from 'mongoose';
import { RegisterRequestDto } from './dto/RegisterRequestDto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async register(user: RegisterRequestDto): Promise<string> {
    const existingUser = await this.userService.findByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser: RegisterRequestDto = { ...user, password: hashedPassword };
    await this.userService.create(newUser);
    return 'registered successfully';
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{
    access_token: string;
    payload: { userid: Types.ObjectId; role: string };
  }> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    console.log('password:', user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(await bcrypt.compare(password, user.password));
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userid: user._id, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
      payload,
    };
  }
}
