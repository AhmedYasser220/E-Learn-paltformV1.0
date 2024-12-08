import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { registerRequestDto } from './Dtos/registerRequestDto';
import { signInDto } from './Dtos/signInDto';
import { User } from 'src/user/Models/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // User Registration
  async register(registerDto: registerRequestDto): Promise<string> {
    // Check if the email already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(registerDto.password_hash, 10);

    // Create the new user
    const newUser: Partial<User> = {
      email: registerDto.email,
      password_hash: hashedPassword,
      role: registerDto.role || 'student', // Default role if not provided
    };

    // Save the user to the database
    await this.usersService.create(newUser);

    return 'User registered successfully';
  }

  // User Sign In
  async signIn(signInDto: signInDto): Promise<{
    access_token: string;
    payload: { userid: string; role: string };
  }> {
    // Find the user by email
    const user = await this.usersService.findByEmail(signInDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password_hash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Prepare the payload for the JWT
    const payload = { userid: user._id, role: user.role };

    // Generate the JWT
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
      payload,
    };
  }
}
