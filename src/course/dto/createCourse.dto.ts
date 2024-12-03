export class CreateCourseDto {
  title: string;
  description: string;
  category: string;
  difficulty_level: string;
  created_by: string;
  created_at?: Date;
}
