import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForumThread } from './models/forum.model';

@Injectable()
export class ForumService {
  constructor(
    @InjectModel(ForumThread.name) private forumModel: Model<ForumThread>
  ) {}

  async createThread(courseId: string, title: string, authorId: string) {
    const thread = new this.forumModel({
      courseId,
      title,
      authorId,
      replies: []
    });
    return await thread.save();
  }

  async addReply(threadId: string, body: string, authorId: string) {
    return this.forumModel.findByIdAndUpdate(
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
  }

  async getThreadsByCourse(courseId: string) {
    return this.forumModel.find({ courseId });
  }
}