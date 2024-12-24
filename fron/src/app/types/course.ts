export interface Course {
    _id: string;
    course_Id: string;
    title: string;
    description: string;
    category: string;
    difficulty_level: string;
    created_by: string;
    current_version: number;
    is_available: boolean;
    multimedia_resources: {
      filePath: string;
      isOutdated: boolean;
    }[];
    versions: {
      version_number: number;
      title: string;
      description: string;
      category: string;
      difficulty_level: string;
      updated_by: string;
      updated_at: Date;
    }[];
  }
  