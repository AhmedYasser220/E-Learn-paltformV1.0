export class CreateCourseDto {
  course_Id: string;
  title: string;
  description: string;
  category: string;
  difficulty_level: string;
  created_by: string;
  created_at?: Date;
  multimedia_resources?: { filePath: string; isOutdated?: boolean }[];
  is_available: boolean;
}
