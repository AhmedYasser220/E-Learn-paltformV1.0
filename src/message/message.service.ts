import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  private messages = [];

  create(messageDto) {
    const message = { id: Date.now().toString(), ...messageDto };
    this.messages.push(message);
    return message;
  }

  findByForum(forumId: string) {
    return this.messages.filter(message => message.forumId === forumId);
  }
}