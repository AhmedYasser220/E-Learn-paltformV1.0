import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumDto } from './Dto/create-forum-dto';

@Controller('forums')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  create(@Body() createForumDto: CreateForumDto) {
    return this.forumService.create(createForumDto);
  }

  @Get(':courseId')
  findByCourse(@Param('courseId') courseId: string) {
    return this.forumService.findByCourse(courseId);
  }
}