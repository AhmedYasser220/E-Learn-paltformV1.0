export class StudentAnalyticsDto {
  studentID:string;
  studentName: string;
  studentEmail: string;
  totalEnrolledCourses: number;
  averageCompletionRate: number;
  lastAccessedCourses: { courseTitle: string; lastAccessed: Date }[];
}
