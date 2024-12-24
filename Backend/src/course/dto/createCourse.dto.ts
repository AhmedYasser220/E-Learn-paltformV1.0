import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  course_Id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  difficulty_level: string;

  @IsNotEmpty()
  created_by: string;

  @IsOptional()
  created_at?: Date; // Optional, as this is typically generated

  @IsNotEmpty()
  current_version: number;

  @IsOptional()
  versions?: {
    version_number: number;
    title: string;
    description: string;
    category: string;
    difficulty_level: string;
    updated_by: string;
    updated_at: Date;
  }[];

  @IsOptional()
  multimedia_resources?: { filePath: string; isOutdated?: boolean }[];

  @IsNotEmpty()
  is_available: boolean;
}
