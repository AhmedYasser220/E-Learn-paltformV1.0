import { Controller, Post, Get, HttpStatus, HttpException } from '@nestjs/common';
import { BackupService } from './backup.service';

@Controller('api/backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Post('schedule')
  async scheduleBackup() {
    try {
      await this.backupService.scheduleBackup();
      return {
        success: true,
        message: 'Backup scheduled successfully!',
        status: HttpStatus.OK
      };
    } catch (error) {
      console.error('Controller error in scheduleBackup:', error);
      throw new HttpException({
        success: false,
        message: 'Backup scheduling failed',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getBackups() {
    try {
      const backups = await this.backupService.getBackups();
      return {
        success: true,
        data: backups,
        status: HttpStatus.OK
      };
    } catch (error) {
      console.error('Controller error in getBackups:', error);
      throw new HttpException({
        success: false,
        message: 'Failed to fetch backups',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}