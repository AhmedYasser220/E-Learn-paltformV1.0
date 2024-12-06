import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class AddParticipantDto {
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(['student', 'instructor'], { message: 'Role must be either "student" or "instructor"' })
  role: 'student' | 'instructor';
}
