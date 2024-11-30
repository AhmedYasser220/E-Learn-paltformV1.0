import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ForumService } from './forum.service';

@Controller('forums')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post('thread')
  createThread(
    @Body('courseId') courseId: string,
    @Body('title') title: string,
    @Body('authorId') authorId: string
  ) {
    return this.forumService.createThread(courseId, title, authorId);
  }

  @Post('reply/:threadId')
  addReply(
    @Param('threadId') threadId: string,
    @Body('body') body: string,
    @Body('authorId') authorId: string
  ) {
    return this.forumService.addReply(threadId, body, authorId);
  }

  @Get('course/:courseId')
  getThreadsByCourse(@Param('courseId') courseId: string) {
    return this.forumService.getThreadsByCourse(courseId);
  }
}