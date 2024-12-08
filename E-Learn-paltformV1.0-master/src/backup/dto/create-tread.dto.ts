import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateThreadDto {
  @IsString()
  @IsNotEmpty({ message: 'Course ID cannot be empty' })
  courseId: string;

  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Author ID cannot be empty' })
  authorId: string;
}