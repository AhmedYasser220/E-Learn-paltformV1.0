export class RegisterRequestDto {
  email: string;
  name: string;
  password: string;
  role: string = 'student';
  profile_picture_url: string;
  created_at: Date;
}
