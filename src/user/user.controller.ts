/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { user } from './models/user.schema';
import { createUserDTo } from './Dtos/createUser.dto';


// @UseGuards(AuthGuard) //class level
@Controller('user') // it means anything starts with /student
export class UserController {
  constructor(private UserService: UserService) {}
  
  @Get()
  // Get all students
  async getAllUsers(): Promise<user[]> {
    return await this.UserService.findAll();
  }
 
  @Get('currentUser')
  async getCurrentUser(@Req() { user }): Promise<user> {
    const student = await this.UserService.findById(user.userid);
    console.log(student);
    return student;
  }


  @Get(':id') // /student/:id
  // Get a single student by ID
  async getUserById(@Param('id') id: string): Promise<user> {
    // Get the student ID from the route parameters
    const student = await this.UserService.findById(id);
    return student;
  }
  // Create a new student
  @Post()
  async createUser(@Body() studentData: createUserDTo) {
    // Get the new student data from the request body
    const newStudent = await this.UserService.create(studentData);
    return newStudent;
  }
 
}
