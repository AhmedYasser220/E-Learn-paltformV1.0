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
    try {
      console.log('Initiating scheduled backup...');
      const result = await this.performBackup();
      console.log(`Scheduled backup completed successfully. Users backed up: ${result}`);
    } catch (error) {
      console.error('Scheduled backup failed:', error);
      throw error;
    }
  }

  async getBackups() {
    try {
      const backups = await this.backupModel
        .find()
        .sort({ backup_date: -1 })
        .exec();
      return backups;
    } catch (error) {
      console.error('Error fetching backups:', error);
      throw error;
    }
  }

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
          backup_id: `backup_${Date.now()}`,
          backup_date: new Date(),
          data_type: "JSON",
          data: userBatch,
        });
        
        await backup.save();
        
        totalBackedUp += userBatch.length;
        skip += batchSize;
        
        console.log(`Backed up batch of ${userBatch.length} users. Total: ${totalBackedUp}`);
      }
      
      return totalBackedUp;
    } catch (error) {
      console.error('Error during backup process:', error);
      throw error;
    }
  }
}