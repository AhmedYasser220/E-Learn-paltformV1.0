// src/forum/dto/create-thread.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateThreadDto {
  [x: string]: string;
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  courseId: string; // The ID of the course this thread belongs to
}
