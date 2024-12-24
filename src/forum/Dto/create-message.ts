export class CreateMessageDto {
  threadId: string;
  content: string;
  type: 'question' | 'reply' | 'announcement';
}
