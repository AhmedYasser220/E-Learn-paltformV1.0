import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user')

export class UserController {
  constructor(private readonly userService: UserService) {}

 @Get('students/search')
   
  async searchStudents(@Query() filters: any) {
    return this.userService.searchStudents(filters);
  }

  @Get('instructors/search')
  
  async searchInstructors(@Query() filters: any) {
    return this.userService.searchInstructors(filters);
  }
}
