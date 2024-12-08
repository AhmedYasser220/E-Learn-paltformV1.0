import { Injectable } from '@nestjs/common';

@Injectable()
export class ForumService {
  private forums = [];

  create(forumDto) {
    const forum = { id: Date.now().toString(), ...forumDto };
    this.forums.push(forum);
    return forum;
  }

  findByCourse(courseId: string) {
    return this.forums.filter(forum => forum.courseId === courseId);
  }
}