import { Controller, Post } from '@nestjs/common';
import { BackupService } from './backup.service';

@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Post('schedule')
  scheduleBackup(): string {
    this.backupService.scheduleBackup();
    return 'Backup scheduled successfully!';
  }
}
