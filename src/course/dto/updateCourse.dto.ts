export class UpdateCourseDto {
  title?: string;
  description?: string;
  category?: string;
  difficulty_level?: string;
  updated_at?: Date;
  multimedia_resources?: { filePath: string; isOutdated?: boolean }[];
  is_available?: boolean;
}