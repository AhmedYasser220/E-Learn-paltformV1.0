import { Controller, Post, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { CreateThreadDto } from './dto/create-thread.dto';
import { CreateMessageDto } from './dto/create-message';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  // Endpoint to create a forum
  @Post('forum')
  async createForum(@Body() createForumDto: CreateForumDto) {
    return this.forumService.createForum(createForumDto);
  }

  // Endpoint to create a thread within a forum
  @Post('threads')
  async createThread(
    @Body() createThreadDto: CreateThreadDto,
    @Headers('x-user-id') userId: string,
    @Headers('x-user-role') role: string,
  ) {
    if (!userId || !role) {
      throw new UnauthorizedException('User ID and role must be provided in headers.');
    }
    return this.forumService.createThread(createThreadDto, userId, role);
  }

  // Endpoint to add a message to a thread
  @Post('messages')
  async addMessage(
    @Body() createMessageDto: CreateMessageDto,
    @Headers('x-user-id') userId: string,
    @Headers('x-user-role') role: string,
  ) {
    if (!userId || !role) {
      throw new UnauthorizedException('User ID and role must be provided in headers.');
    }
    return this.forumService.addMessage(createMessageDto, userId, role);
  }
}
