// src/forum/dto/create-reply.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  threadId: string; // The thread this reply is linked to
}
