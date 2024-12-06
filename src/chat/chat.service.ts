// chat.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { AddParticipantDto } from './dto/add-participant.dto';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  // Save a message to the database
  async saveMessage(createMessageDto: CreateMessageDto) {
    console.log('Saving message:', createMessageDto);
    const createdMessage = new this.chatModel(createMessageDto);
    return createdMessage.save();
  }

  // Get messages by roomId
  async getMessagesByRoom(roomId: string) {
    const room = await this.chatModel.findOne({ roomId }).exec();
    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }
    return room.message;
  }

  // Add a participant to a room
  async addParticipant(addParticipantDto: AddParticipantDto) {
    const { roomId, userId, role } = addParticipantDto;

    // Find the room by ID
    const room = await this.chatModel.findOne({ roomId }).exec();
    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }

    // Check if the user is already a participant
    const isAlreadyParticipant = room.participants.some(
      (participant) => participant.userId === userId,
    );
    if (isAlreadyParticipant) {
      throw new BadRequestException(`User with ID ${userId} is already a participant`);
    }

    // Add the new participant
    room.participants.push({ userId, role });
    return room.save();
  }
}
