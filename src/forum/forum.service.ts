// src/forum/forum.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateForumDto } from './dto/create-forum.dto';
import { CreateThreadDto } from './dto/create-thread.dto';
import { CreateReplyDto } from './dto/create-reply.dto';
import { Forum } from './schemas/forum.schema';
import { Thread } from './schemas/thread.schema';
import { Reply } from './schemas/reply.schema';
import { User } from '../user/Models/user.model'; // Import the User schema

@Injectable()
export class ForumService {
  constructor(
    @InjectModel('Forum') private forumModel: Model<Forum>,
    @InjectModel('Thread') private threadModel: Model<Thread>,
    @InjectModel('Reply') private replyModel: Model<Reply>,
    @InjectModel('User') private userModel: Model<User>, // Injecting user model to validate roles
  ) {}

  async createForum(createForumDto: CreateForumDto): Promise<Forum> {
    const createdForum = new this.forumModel(createForumDto);
    return createdForum.save();
  }

  async createThread(createThreadDto: CreateThreadDto, userId: string): Promise<Thread> {
    // Ensure only students can create threads of type "question"
    const user = await this.userModel.findById(userId);
    if (!user || user.role !== 'student') {
      throw new UnauthorizedException('Only students can create questions.');
    }
    
    createThreadDto.type = 'question'; // Set type to "question" for threads created by students
    const createdThread = new this.threadModel(createThreadDto);
    return createdThread.save();
  }

  async createReply(createReplyDto: CreateReplyDto, userId: string): Promise<Reply> {
    // Ensure only instructors can reply or post announcements
    const user = await this.userModel.findById(userId);
    if (!user || user.role !== 'instructor') {
      throw new UnauthorizedException('Only instructors can reply or post announcements.');
    }

    const createdReply = new this.replyModel(createReplyDto);
    return createdReply.save();
  }

  async getForums(courseId: string): Promise<Forum[]> {
    return this.forumModel.find({ courseId }).exec();
  }

  async getThreads(courseId: string): Promise<Thread[]> {
    return this.threadModel.find({ courseId }).exec();
  }

  async getReplies(threadId: string): Promise<Reply[]> {
    return this.replyModel.find({ threadId }).exec();
  }
}
