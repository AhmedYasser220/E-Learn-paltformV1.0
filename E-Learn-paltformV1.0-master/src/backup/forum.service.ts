import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForumThread } from './models/forum.model';
import axios from 'axios';

const API_URL = 'mongodb://localhost:27017/e-ler';

export const forumService = {
  createThread: async (courseId: string, title: string, authorId: string) => {
    try {
      const response = await axios.post(`${API_URL}/thread`, {
        courseId,
        title,
        authorId
      });
      return response.data;
    } catch (error) {
      console.error('Thread creation failed:', error);
      throw error;
    }
  },

  addReply: async (threadId: string, body: string, authorId: string) => {
    try {
      const response = await axios.post(`${API_URL}/reply/${threadId}`, {
        body,
        authorId
      });
      return response.data;
    } catch (error) {
      console.error('Reply addition failed:', error);
      throw error;
    }
  },

  getThreadsByCourse: async (courseId: string) => {
    try {
      const response = await axios.get(`${API_URL}/course/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Fetching threads failed:', error);
      throw error;
    }
  }
};

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