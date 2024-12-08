import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserDocument } from './Models/user.schema';
import { createuserdto } from './dtos/create-userdto'; // Import the DTO for validation
import { Document } from 'mongodb';
@Controller('users') // Base route for this controller
export class UserController {
  constructor(private readonly usersService: UserService) {}

  // Get a user by their email
  @Get(':email')
  async findByEmail(@Param('email') email: string): Promise<UserDocument> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Create a new user (example endpoint for testing purposes)
  @Post()
  async createUser(@Body() userData: createuserdto): Promise<UserDocument> {
    return this.usersService.create(userData);
  }
}
