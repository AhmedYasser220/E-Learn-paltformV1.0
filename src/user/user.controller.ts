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
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { user } from './models/user.schema';
import { createUserDTo } from './Dtos/createUser.dto';
import { updateUserDTo } from './Dtos/updateUser.dto';

// @UseGuards(AuthGuard) //class level
@Controller('user') // it means anything starts with /student
export class UserController {
  constructor(private userService: UserService) {}
  //@Public()
  @Get()
  // Get all students
  async getAllUser(): Promise<user[]> {
    return await this.userService.findAll();
  }
  //@UseGuards(AuthGuard) // handler level
  @Get('currentUser')
  async getCurrentUser(@Req() { user }): Promise<user> {
    const student = await this.userService.findById(user.userid);
    console.log(student);
    return student;
  }

  //@Roles(Role.User)
  //@UseGuards(authorizationGaurd)
  @Get(':id') // /student/:id
  // Get a single student by ID
  async getUserById(@Param('id') id: string): Promise<user> {
    // Get the student ID from the route parameters
    const student = await this.userService.findById(id);
    return student;
  }
  // Create a new student
  @Post()
  async createUser(@Body() usertData: createUserDTo) {
    // Get the new student data from the request body
    const newStudent = await this.userService.create(usertData);
    return newStudent;
  }
  // Update a student's details
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userData: updateUserDTo) {
    const updatedUser = await this.userService.update(id, userData);
    return updatedUser;
  }
  // Delete a student by ID
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const deletedStudent = await this.userService.delete(id);
    return deletedStudent;
  }

  @Get('students/search')
  async searchStudents(@Query() filters: any) {
    return this.userService.searchStudents(filters);
  }

  @Get('instructors/search')
  async searchInstructors(@Query() filters: any) {
    return this.userService.searchInstructors(filters);
  }
}
