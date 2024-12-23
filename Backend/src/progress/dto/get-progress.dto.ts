import { IsString } from 'class-validator';

export class GetProgressDto {
  @IsString()
  userId: string;
}
