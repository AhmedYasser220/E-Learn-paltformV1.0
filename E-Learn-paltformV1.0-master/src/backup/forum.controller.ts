import { Controller, Post, Get, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateThreadDto } from './/dto/create-tread.dto';
import { CreateReplyDto } from './dto/create-reply.dto';

@Controller('forums')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post('thread')
  @UsePipes(new ValidationPipe({ transform: true }))
  createThread(@Body() createThreadDto: CreateThreadDto) {
    return this.forumService.createThread(
      createThreadDto.courseId, 
      createThreadDto.title, 
      createThreadDto.authorId
    );
  }

  @Post('reply/:threadId')
  @UsePipes(new ValidationPipe({ transform: true }))
  addReply(
    @Param('threadId') threadId: string,
    @Body() createReplyDto: CreateReplyDto
  ) {
    return this.forumService.addReply(
      threadId, 
      createReplyDto.body, 
      createReplyDto.authorId
    );
  }

  @Get('course/:courseId')
  getThreadsByCourse(@Param('courseId') courseId: string) {
    return this.forumService.getThreadsByCourse(courseId);
  }
}