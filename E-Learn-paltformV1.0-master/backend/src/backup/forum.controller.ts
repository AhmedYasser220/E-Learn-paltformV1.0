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
      return {
        success: true,
        data: thread,
        status: HttpStatus.CREATED
      };
    } catch (error) {
      console.error('Controller error in createThread:', error);
      throw new HttpException({
        success: false,
        message: 'Failed to create thread',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
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
      return {
        success: true,
        data: reply,
        status: HttpStatus.CREATED
      };
    } catch (error) {
      console.error('Controller error in addReply:', error);
      throw new HttpException({
        success: false,
        message: 'Failed to add reply',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('course/:courseId')
  async getThreadsByCourse(@Param('courseId') courseId: string) {
    try {
      const threads = await this.forumService.getThreadsByCourse(courseId);
      return {
        success: true,
        data: threads,
        status: HttpStatus.OK
      };
    } catch (error) {
      console.error('Controller error in getThreadsByCourse:', error);
      throw new HttpException({
        success: false,
        message: 'Failed to fetch threads',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}