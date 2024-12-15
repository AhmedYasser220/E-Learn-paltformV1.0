// profile.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('user/:userId/average-score')
  async getUserAverageScore(@Param('userId') userId: string) {
    return this.profileService.getUserAverageScore(userId);
  }
}