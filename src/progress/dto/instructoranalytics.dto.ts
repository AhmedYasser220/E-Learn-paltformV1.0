export class InstructorAnalyticsDto {
  instructorId: string;
  instructorName: string;
  instructorEmail: string;
  totalCourses: number;
  totalStudents: number;
  averageCompletionRate: number;  // Student Engagement
  averageAssessmentScore: number; // Content Effectiveness (assessing quiz results)
}
