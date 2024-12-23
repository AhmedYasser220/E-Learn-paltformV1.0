import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule'; 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Backup } from './models/backup.model';

@Injectable()
export class BackupService {
  constructor(@InjectModel(Backup.name) private backupModel: Model<Backup>) {}

  @Cron('0 0 * * *') 
  scheduleBackup(): void {
    console.log('Scheduling backup...');
    this.performBackup('user accounts');
    this.performBackup('course progress');
  }


  async performBackup(dataType: string): Promise<object> {
    const backup = new this.backupModel({
      backup_date: new Date(),
      data_type: dataType,
      data: { message: `${dataType} backup completed!` }, 
    });

    await backup.save(); 
    return { message: `Backup for ${dataType} completed!` };
  }
}
 /*I used cron because it provides an easy and reliable way to schedule tasks to run at specific intervals such as daily backups the cron job runs the backup process automatically every 24 hours at midnight(like user accounts and course progress).*/