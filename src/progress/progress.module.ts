import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { progressSchema } from './model/progress.model';

@Module({
  imports:[MongooseModule.forFeature([{name : 'progress' , schema: progressSchema}])],
  providers: [ProgressService],
  controllers: [ProgressController],
  exports: [],
})
export class ProgressModule {}
