export class registerRequestDto {
  name: string;
  email: string;
  password_hash: string;
  role: string = 'student';
  profile_picture_url: string = '';
  created_at: Date;
}
