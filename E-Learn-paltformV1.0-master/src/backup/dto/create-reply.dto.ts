import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  @IsNotEmpty({ message: 'Reply body cannot be empty' })
  @MinLength(1, { message: 'Reply must have at least 1 character' })
  body: string;

  @IsString()
  @IsNotEmpty({ message: 'Author ID cannot be empty' })
  authorId: string;
}