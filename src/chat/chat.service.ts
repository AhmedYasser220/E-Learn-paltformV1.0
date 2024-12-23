import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessage } from './schemas/chat.schema';
import { timestamp } from 'rxjs';

@Injectable()
export class ChatService {
  constructor(@InjectModel(ChatMessage.name) private chatModel: Model<ChatMessage>) {}

  async saveMessage(roomId: string, senderId: string, message: string): Promise<ChatMessage> {
    const newMessage = new this.chatModel({ roomId, senderId, message });
    return newMessage.save();
  }

  async getChatHistory(roomId: string) {
    return await this.chatModel.find({roomId}).sort({timestamp:1});
  }
}
