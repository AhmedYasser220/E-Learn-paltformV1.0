import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Forum, ForumDocument } from './schemas/forum.schema';
import { Thread, ThreadDocument } from './schemas/thread.schema';
import { Message, MessageDocument } from './schemas/message.schema';
import { CreateForumDto } from './dto/create-forum.dto';
import { CreateThreadDto } from './dto/create-thread.dto';
import { CreateMessageDto } from './dto/create-message';

@Injectable()
export class ForumService {
  constructor(
    @InjectModel('Forum') private readonly forumModel: Model<ForumDocument>,
    @InjectModel('Thread') private readonly threadModel: Model<ThreadDocument>,
    @InjectModel('Message') private readonly messageModel: Model<MessageDocument>,
  ) {}

  // Create a forum
  async createForum(createForumDto: CreateForumDto): Promise<Forum> {

    const forum = new this.forumModel(createForumDto);
    try {
      const createdForum = await this.forumModel.create(createForumDto);
      return createdForum;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error(`Duplicate forum with courseId ${createForumDto.courseId}`);
      }
      throw error;  // Rethrow other errors
    }
    
   
  }

  // Create a thread within a forum
  async createThread(createThreadDto: CreateThreadDto, userId: string, role: string): Promise<Thread> {
    if (role !== 'student') {
      throw new UnauthorizedException('Only students can create threads.');
    }

    const thread = new this.threadModel({
      ...createThreadDto,
      createdBy: userId,
      messages: [],
    });

    return thread.save();
  }

  // Add a message to a thread
  async addMessage(createMessageDto: CreateMessageDto, userId: string, role: string): Promise<Message> {
    const { threadId, type } = createMessageDto;

    // Role-based checks
    if (type === 'question' && role !== 'student') {
      throw new UnauthorizedException('Only students can ask questions.');
    }
    if ((type === 'reply' || type === 'announcement') && role !== 'instructor') {
      throw new UnauthorizedException('Only instructors can reply or make announcements.');
    }

    const message = new this.messageModel({
      ...createMessageDto,
      createdBy: userId,
      createdAt: new Date(),
    });

    // Save message and update thread
    await message.save();
    await this.threadModel.findByIdAndUpdate(
      threadId,
      { $push: { messages: message._id } },
      { new: true },
    );

    return message;
  }
}
