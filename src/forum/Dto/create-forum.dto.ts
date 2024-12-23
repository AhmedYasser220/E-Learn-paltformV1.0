// src/forum/dto/create-forum.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateForumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  courseId: string;  // The course to which this forum belongs

  @IsString()
  description: string;  // Optional description for the forum
}
