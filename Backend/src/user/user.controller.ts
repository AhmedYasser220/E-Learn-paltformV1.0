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
import { authorizationGuard } from 'src/auth/guards/authorization.guard';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/authentication.guard';
import { Public } from 'src/auth/decorators/public.document';
// @UseGuards(AuthGuard) //class level
@Controller('user') // it means anything starts with /student
@UseGuards(AuthGuard, authorizationGuard)
export class UserController {
  constructor(private userService: UserService) {}
  //@Public()
  @Roles(Role.Admin)
  @Get()
  // Get all students
  async getAllUser(): Promise<user[]> {
    return await this.userService.findAll();
  }
  //@UseGuards(AuthGuard) // handler level

  @Roles(Role.Admin, Role.Student, Role.Instructor)
  @Get('profile')
  // View the current user's profile (personal info)
  async viewProfile(@Req() { user }): Promise<user> {
    const student = await this.userService.viewProfile(user.userid);
    if (!student) {
      throw new Error(`User with ID ${user.userid} not found`);
    }
    return student; // Return user's profile info
  }
  // Create a new student
  @Post()
  async createUser(@Body() usertData: createUserDTo) {
    // Get the new student data from the request body
    const newStudent = await this.userService.create(usertData);
    return newStudent;
  }
  @Roles(Role.Admin, Role.Student, Role.Instructor)
  @Put('profile')
  // Update the current user's profile (personal info)
  async updateProfile(@Req() { user }, @Body() updateData: updateUserDTo) {
    const updatedStudent = await this.userService.updateProfile(
      user.userid,
      updateData,
    );
    if (!updatedStudent) {
      throw new Error('Unable to update profile');
    }
    return updatedStudent; // Return the updated profile
  }
  // Delete a student by ID
  @Roles(Role.Admin, Role.Student, Role.Instructor)
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
  // View personal info (User Profile Management)

  // Update personal info (User Profile Management)
}
