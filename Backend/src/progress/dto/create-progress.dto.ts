import {
  IsString,
  IsNumber,
  IsDate,
  IsBoolean,
  IsOptional,
  Min,
  Max,
  IsArray,
} from 'class-validator';

export class CreateProgressDto {
  @IsString()
  courseId: string;

  @IsString()
  userId: string;

  @IsNumber()
  completion_percentage: number;

  @IsOptional()
  @IsDate()
  completedAt?: Date;

  @IsOptional()
  @IsBoolean()
  courseCompleted?: boolean;

  @IsOptional()
  @IsArray()
  moduleRatings?: { [moduleId: string]: number };

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  courseRating?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  instructorRating?: number;
}
