// src/forum/forum.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { CreateThreadDto } from './dto/create-thread.dto';
import { CreateReplyDto } from './dto/create-reply.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Assuming JWT authentication guard is implemented

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post('create')
  async createForum(@Body() createForumDto: CreateForumDto) {
    return this.forumService.createForum(createForumDto);
  }

  @Post('threads')
  @UseGuards(JwtAuthGuard)
  async createThread(@Body() createThreadDto: CreateThreadDto, @Body('userId') userId: string) {
    return this.forumService.createThread(createThreadDto, userId);
  }

  @Post('replies')
  @UseGuards(JwtAuthGuard)
  async createReply(@Body() createReplyDto: CreateReplyDto, @Body('userId') userId: string) {
    return this.forumService.createReply(createReplyDto, userId);
  }

  @Get('forums/:courseId')
  async getForums(@Param('courseId') courseId: string) {
    return this.forumService.getForums(courseId);
  }

  @Get('threads/:courseId')
  async getThreads(@Param('courseId') courseId: string) {
    return this.forumService.getThreads(courseId);
  }

  @Get('replies/:threadId')
  async getReplies(@Param('threadId') threadId: string) {
    return this.forumService.getReplies(threadId);
  }
}
