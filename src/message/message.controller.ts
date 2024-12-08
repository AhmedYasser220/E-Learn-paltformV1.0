import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './Dto/create-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get(':forumId')
  findByForum(@Param('forumId') forumId: string) {
    return this.messageService.findByForum(forumId);
  }
}