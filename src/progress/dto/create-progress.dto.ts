import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateProgressDto {
  @IsString()
  courseId: string;

  @IsString()
  userId: string;

  @IsNumber()
  completion_percentage: number;

  @IsDate()
  completedAt: Date;



}
