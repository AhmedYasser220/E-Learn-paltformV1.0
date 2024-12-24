// profile.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('user/:userId/average-score')
  //to use the guard done in the auth 
  async getUserAverageScore(@Param('userId') userId: string) {
    //get id from token el haygilak and then pass it to the service 
    return this.profileService.getUserAverageScore(userId);
  }
}