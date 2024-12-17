// profile.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { progress, progressSchema } from '../Progress/Model/progress.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: progress.name, schema: progressSchema }]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}