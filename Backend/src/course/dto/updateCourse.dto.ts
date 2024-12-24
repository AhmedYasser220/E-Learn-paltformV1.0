export class UpdateCourseDto {
    title?: string;
    description?: string;
    category?: string;
    difficulty_level?: string;
    updated_at?: Date;
    updated_by?: string;
    multimedia_resources?: { filePath: string; isOutdated?: boolean }[];
    is_available?: boolean;
  }