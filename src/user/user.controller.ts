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
import { updateUserDTo } from './Dtos/updateUser.dto';

// @UseGuards(AuthGuard) //class level
@Controller('students') // it means anything starts with /student
export class UserController {
  constructor(private studentService: UserService) {}
  //@Public()
  @Get()
  // Get all students
  async getAllStudents(): Promise<user[]> {
    return await this.studentService.findAll();
  }
  //@UseGuards(AuthGuard) // handler level
  @Get('currentUser')
  async getCurrentUser(@Req() { user }): Promise<user> {
    const student = await this.studentService.findById(user.userid);
    console.log(student);
    return student;
  }

  //@Roles(Role.User)
  //@UseGuards(authorizationGaurd)
  @Get(':id') // /student/:id
  // Get a single student by ID
  async getStudentById(@Param('id') id: string): Promise<user> {
    // Get the student ID from the route parameters
    const student = await this.studentService.findById(id);
    return student;
  }
  // Create a new student
  @Post()
  async createStudent(@Body() usertData: createUserDTo) {
    // Get the new student data from the request body
    const newStudent = await this.studentService.create(usertData);
    return newStudent;
  }
  // Update a student's details
  @Put(':id')
  async updateStudent(
    @Param('id') id: string,
    @Body() studentData: updateUserDTo,
  ) {
    const updatedStudent = await this.studentService.update(id, studentData);
    return updatedStudent;
  }
  // Delete a student by ID
  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    const deletedStudent = await this.studentService.delete(id);
    return deletedStudent;
  }



  // View personal info (User Profile Management)
  @Get('profile')
  // View the current user's profile (personal info)
  async viewProfile(@Req() { user }): Promise<user> {
    const student = await this.studentService.findById(user.userid);
    if (!student) {
      throw new Error(`User with ID ${user.userid} not found`);
    }
    return student; // Return user's profile info
  }

  // Update personal info (User Profile Management)
  @Put('profile')
  // Update the current user's profile (personal info)
  async updateProfile(
    @Req() { user },
    @Body() updateData: updateUserDTo,
  ) {
    const updatedStudent = await this.studentService.update(user.userid, updateData);
    if (!updatedStudent) {
      throw new Error('Unable to update profile');
    }
    return updatedStudent; // Return the updated profile
  }
}
