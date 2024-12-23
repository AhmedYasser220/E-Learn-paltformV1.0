// src/forum/forum.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { ForumSchema } from './schemas/forum.schema';
import { ThreadSchema } from './schemas/thread.schema';
import { ReplySchema } from './schemas/reply.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Forum', schema: ForumSchema },
      { name: 'Thread', schema: ThreadSchema },
      { name: 'Reply', schema: ReplySchema },
    ]),
  ],
  controllers: [ForumController],
  providers: [ForumService],
})
export class ForumModule {}
