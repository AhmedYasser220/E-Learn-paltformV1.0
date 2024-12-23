import { Controller, Post, Get, Body, Param, UsePipes, ValidationPipe, HttpStatus, HttpException } from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateThreadDto } from './dto/create-tread.dto';
import { CreateReplyDto } from './dto/create-reply.dto';

@Controller('api/forums')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post('thread')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createThread(@Body() createThreadDto: CreateThreadDto) {
    try {
      const thread = await this.forumService.createThread(
        createThreadDto.courseId, 
        createThreadDto.title, 
        createThreadDto.authorId
      );
      return { data: thread, status: HttpStatus.CREATED };
    } catch (error) {
      throw new HttpException('Failed to create thread', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('reply/:threadId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async addReply(
    @Param('threadId') threadId: string,
    @Body() createReplyDto: CreateReplyDto
  ) {
    try {
      const reply = await this.forumService.addReply(
        threadId, 
        createReplyDto.body, 
        createReplyDto.authorId
      );
      return { data: reply, status: HttpStatus.CREATED };
    } catch (error) {
      throw new HttpException('Failed to add reply', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('course/:courseId')
  async getThreadsByCourse(@Param('courseId') courseId: string) {
    try {
      const threads = await this.forumService.getThreadsByCourse(courseId);
      return { data: threads, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException('Failed to fetch threads', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}