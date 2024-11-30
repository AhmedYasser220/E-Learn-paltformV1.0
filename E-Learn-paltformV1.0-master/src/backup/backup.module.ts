import { Module } from '@nestjs/common';
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';
import { ScheduleModule } from '@nestjs/schedule'; 
import { MongooseModule } from '@nestjs/mongoose';
import { Backup, BackupSchema } from './models/backup.model';
import { UserModule } from './user.module'; 
import { ForumModule } from './forum.module'; 

@Module({
  imports: [
    ScheduleModule.forRoot(), 
    MongooseModule.forFeature([{ name: Backup.name, schema: BackupSchema }]),
    UserModule, 
    ForumModule
  ],
  controllers: [BackupController],
  providers: [BackupService],
})
export class BackupModule {}