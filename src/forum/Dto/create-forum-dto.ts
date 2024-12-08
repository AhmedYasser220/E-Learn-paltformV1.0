export class CreateForumDto {
    readonly courseId: string; // Link to the course
    readonly title: string;
    readonly description: string;
    readonly category: string; // Users enrolled in the forum
  }