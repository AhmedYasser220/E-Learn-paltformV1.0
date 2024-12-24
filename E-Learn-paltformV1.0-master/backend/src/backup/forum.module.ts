import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { ForumThread, ForumThreadSchema } from './models/forum.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ForumThread.name, schema: ForumThreadSchema }])
  ],
  controllers: [ForumController],
  providers: [ForumService],
  exports: [ForumService] 
})
export class ForumModule {}