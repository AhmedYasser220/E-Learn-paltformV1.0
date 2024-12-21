import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { progressSchema } from './model/progress.model';
import {user,UserSchema} from '../user/Models/user.schema'

@Module({
  imports:[MongooseModule.forFeature([{name : 'progress' , schema: progressSchema},
    {name:user.name , schema:UserSchema}
  ])],
  providers: [ProgressService],
  controllers: [ProgressController],
  exports: [],
})
export class ProgressModule {}
