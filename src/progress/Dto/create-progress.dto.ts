import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateProgressDto {
  @IsString()
  courseId: string;

  @IsString()
  userId: string;

  @IsNumber()
  progress: number;

  @IsDate()
  completedAt: Date;
}
