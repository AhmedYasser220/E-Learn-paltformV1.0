// chat.controller.ts

import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AddParticipantDto } from './dto/add-participant.dto';

@Controller('chat') // Base route for the controller
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // Route for POST /chat/message
  @Post('message')
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    console.log('Received message:', createMessageDto);
    return this.chatService.saveMessage(createMessageDto);
  }

  // Route for GET /chat/messages/:roomId
  @Get('messages/:roomId')
  async getMessages(@Param('roomId') roomId: string) {
    console.log('Fetching messages for room:', roomId);
    return this.chatService.getMessagesByRoom(roomId);
  }

  // Route for POST /chat/add-participant
  @Post('add-participant')
  async addParticipant(@Body() addParticipantDto: AddParticipantDto) {
    console.log('Adding participant:', addParticipantDto);
    return this.chatService.addParticipant(addParticipantDto);
  }
}
