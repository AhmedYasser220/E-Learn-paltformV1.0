import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForumThread } from './models/forum.model';
import axios from 'axios';

const API_URL = 'mongodb://localhost:27017/e-ler';

@Injectable()
export class ForumService {
  static getThreadsByCourse(courseId: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(ForumThread.name) private forumModel: Model<ForumThread>
  ) {}

  async createThread(courseId: string, title: string, authorId: string) {
    const thread = new this.forumModel({
      courseId,
      title,
      authorId,
      replies: [],
      createdAt: new Date()  
    });
    return await thread.save();
  }

  // Function to add a reply to a thread
  async addReply(threadId: string, body: string, authorId: string) {
    const thread = await this.forumModel.findById(threadId);
    if (!thread) {
      throw new NotFoundException('Thread not found');
    }

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
    return this.forumModel.find({ courseId }).sort({ createdAt: -1 });
  }

  static async fetchThreadsFromBackend(courseId: string) {
    try {
      const response = await axios.get(`${API_URL}/course/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching threads:', error);
      throw error;
    }
  }
}
