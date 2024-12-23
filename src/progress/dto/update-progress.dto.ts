import { IsOptional, IsNumber, IsDate, IsBoolean, Min, Max } from 'class-validator';

export class UpdateProgressDto {
  @IsOptional()
  @IsNumber()
   @Min(0)
   @Max(100)
  completion_percentage?: number;

  @IsOptional()
  @IsDate()
  completedAt?: Date;

  @IsOptional()
  @IsBoolean()
  courseCompleted?: boolean;

  @IsOptional()
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