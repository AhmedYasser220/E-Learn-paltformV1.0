import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForumThread } from './models/forum.model';

@Injectable()
export class ForumService {
  constructor(
    @InjectModel(ForumThread.name) private forumModel: Model<ForumThread>
  ) {}

  async createThread(courseId: string, title: string, authorId: string) {
    try {
      const thread = new this.forumModel({
        courseId,
        title,
        authorId,
        replies: [],
        createdAt: new Date()
      });
      const savedThread = await thread.save();
      return savedThread;
    } catch (error) {
      console.error('Error in createThread:', error);
      throw error;
    }
  }

  async addReply(threadId: string, body: string, authorId: string) {
    try {
      const thread = await this.forumModel.findById(threadId);
      if (!thread) {
        throw new NotFoundException('Thread not found');
      }

      const updatedThread = await this.forumModel.findByIdAndUpdate(
        threadId,
        { 
          $push: { 
            replies: { 
              body, 
              authorId, 
              createdAt: new Date() 
            } 
          } 
        },
        { new: true }
      );
      
      return updatedThread;
    } catch (error) {
      console.error('Error in addReply:', error);
      throw error;
    }
  }

  async getThreadsByCourse(courseId: string) {
    try {
      const threads = await this.forumModel
        .find({ courseId })
        .sort({ createdAt: -1 })
        .exec();
      return threads;
    } catch (error) {
      console.error('Error in getThreadsByCourse:', error);
      throw error;
    }
  }
}