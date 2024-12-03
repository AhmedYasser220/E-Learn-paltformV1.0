import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './Models/user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':user_Id')
  async getProfile(@Param('user_Id') user_Id: string) {
    const userProfile = await this.userService.getUserProfile(user_Id);
    if (!userProfile) {
      throw new Error(`User with ID ${user_Id} not found`);
    }
    return userProfile;
  }

  @Put(':user_Id')
  async updateProfile(
    @Param('user_Id') user_Id: string,
    @Body() updateData: Partial<User>
  ) {

    if (!updateData) {
      throw new Error('No data provided for update');
    }
    //  the update
    const updatedUser = await this.userService.updateUserProfile(user_Id, updateData);
    if (!updatedUser) {
      throw new Error(`Unable to update user with ID ${user_Id}`);
    }
    return updatedUser;
  }
}
