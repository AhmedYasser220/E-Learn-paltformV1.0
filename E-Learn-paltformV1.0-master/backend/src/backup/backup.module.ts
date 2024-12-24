import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';
import { Backup, BackupSchema } from './models/backup.model';
import { User, UserSchema } from '../user/models/user.model';
import { UserModule } from '../user/user.module';  

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Backup.name, schema: BackupSchema },
      { name: User.name, schema: UserSchema },
    ]),
    forwardRef(() => UserModule), 
  ],
  providers: [BackupService],
  controllers: [BackupController],
})
export class BackupModule {}
