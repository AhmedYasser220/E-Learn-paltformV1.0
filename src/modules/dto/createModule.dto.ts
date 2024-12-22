export class CreateModuleDto {
  module_id: string;
  course_id: string;
  title: string;
  content: string;
  resources?: string[];
  created_at?: Date;
}
