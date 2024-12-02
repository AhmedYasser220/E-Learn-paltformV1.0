import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { user } from './Models/user.model';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Fetch user profile by user_Id
  @Get(':user_Id')
  async getProfile(@Param('user_Id') user_Id: string) {
    return this.userService.getUserProfile(user_Id);
  }

  // Update user profile by user_Id with partial data
  @Put(':user_Id')
  async updateProfile(
    @Param('user_Id') user_Id: string,
    @Body() updateData: Partial<user>
  ) {
    return this.userService.updateUserProfile(user_Id, updateData);
  }
}
