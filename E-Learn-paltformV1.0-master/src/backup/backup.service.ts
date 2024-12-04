import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Backup } from './models/backup.model';
import { User } from '../user/Models/user.model';

@Injectable()
export class BackupService {
  constructor(
    @InjectModel(Backup.name) private backupModel: Model<Backup>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  @Cron('*/2 * * * * *')  
  async scheduleBackup(): Promise<void> {
    console.log('Scheduling backup...');
    await this.performBackup(); 
  }

  // Async backup process
  async performBackup() {
    try {
      const batchSize = 1000;
      let skip = 0;
      let totalBackedUp = 0;
      
      while (true) {
        const userBatch = await this.userModel
          .find()
          .skip(skip)
          .limit(batchSize)
          .exec();
        
        if (userBatch.length === 0) break;
        
        const backup = new this.backupModel({
          backup_date: new Date(),
          data_type: "Json",
          data: userBatch,
        });
        
        await backup.save();
        
        totalBackedUp += userBatch.length;
        skip += batchSize;
      }
      
      console.log(`Backup completed successfully. Total users backed up: ${totalBackedUp}`);
    } catch (error) {
      console.error('Error during backup:', error);
    }
  }
}