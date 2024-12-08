import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { ForumSchema } from './model/forum.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Forum', schema: ForumSchema }]), // Register the Forum schema
  ],
  controllers: [ForumController], // Add the ForumController
  providers: [ForumService], // Add the ForumService
})
export class ForumModule {}
