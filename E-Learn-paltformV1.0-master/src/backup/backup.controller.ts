import { Controller, Post, Get, HttpStatus, HttpException } from '@nestjs/common';
import { BackupService } from './backup.service';

@Controller('api/backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Post('schedule')
  async scheduleBackup() {
    try {
      await this.backupService.scheduleBackup();
      return { message: 'Backup scheduled successfully!', status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException('Backup scheduling failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getBackups() {
    try {
      const backups = await this.backupService.getBackups();
      return { data: backups, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException('Failed to fetch backups', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}