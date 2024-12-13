/* eslint-disable @typescript-eslint/no-unused-vars */
import { responses } from './../responses/Model/responses.model';
import { quizzes } from './../quizzes/Model/quizzes.model';
import { course, CourseSchema } from './../course/Model/course.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { progress } from './Model/progress.model';
import { user } from 'src/user/Models/user.schema';
import { InstructorAnalyticsDto } from './dto/instructoranalytics.dto';
import { CreateProgressDto } from './dto/create-progress.dto';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(progress.name) private readonly progressModel: Model<progress>,
    @InjectModel(course.name) private readonly courseModel: Model<course>,
    @InjectModel(user.name) private readonly userModel: Model<user>,
    @InjectModel(responses.name)
    private readonly responseModel: Model<responses>,
    @InjectModel(quizzes.name) private readonly quizModel: Model<quizzes>,
  ) {}

  // Create or update progress for a user on a course
  async createOrUpdateProgress(
    createProgressDto: CreateProgressDto,
  ): Promise<progress> {
    const { userId, courseId, completion_percentage, completedAt } =
      createProgressDto;

    // Check if progress record already exists
    const existingProgress = await this.progressModel.findOne({
      userId,
      courseId,
    });

    if (existingProgress) {
      // Update the existing progress record
      existingProgress.completion_percentage =
        createProgressDto.completion_percentage;
      if (existingProgress.completion_percentage >= 100) {
        existingProgress.courseCompleted = true;
      }
      existingProgress.completedAt = completedAt;
      return existingProgress.save();
    } else {
      // Create a new progress record
      const newProgress = new this.progressModel(createProgressDto);
      return newProgress.save();
    }
  }

  // Get the user's progress in all courses
  async getUserProgress(userId: string): Promise<progress[]> {
    return this.progressModel.find({ userId }).exec();
  }

  // Get progress for a specific course of a user
  async getCourseProgress(
    userId: string,
    courseId: string,
  ): Promise<progress | null> {
    return this.progressModel.findOne({ userId, courseId }).exec();
  }

  //-----------------------------------------------------------------------------------------
  async getInstructorAnalytics(
    instructorId: string,
  ): Promise<InstructorAnalyticsDto> {
    const instructor = await this.userModel.findOne({ _id: instructorId });
  if (!instructor) {
    throw new NotFoundException('Instructor not found.');
  }

  // Fetch all courses created by the instructor
  const courses = await this.courseModel.find({ created_by: instructorId });
  if (!courses.length) {
    throw new NotFoundException('No courses found for the instructor.');
  }
  const courseIds = courses.map((course) => course.course_Id);

  // Fetch progress records for all courses created by the instructor
  const progresses = await this.progressModel.find({ courseId: { $in: courseIds } });

  // Total number of students who have progress records
  const totalStudents = progresses.length;

  // Filter progress records for completed courses
  const completedProgresses = progresses.filter(
    (progress) => progress.completion_percentage === 100,
  );

  // Calculate completion rate
  const totalCompleted = completedProgresses.length;
  const completionRate = totalStudents > 0 ? (totalCompleted / totalStudents) * 100 : 0;

  // Calculate average assessment score
  const averageAssessmentScore = await this.calculateAverageAssessmentScore(courseIds);
  
    return {
      instructorId,
      instructorName: instructor.name,
      instructorEmail: instructor.email,
      totalCourses: courses.length,
      totalStudents,
      averageCompletionRate : completionRate,
      averageAssessmentScore,
    };
  }
  
  private async calculateAverageAssessmentScore(courseIds: string[]): Promise<number> {
    // Fetch all quizzes for the given course IDs
    const quizzes = await this.quizModel.find({ module_id: { $in: courseIds } });
  
    if (!quizzes.length) return 0;
  
    // Fetch all responses for the quizzes
    const quizIds = quizzes.map((quiz) => quiz.quiz_id);
    const responses = await this.responseModel.find({ quiz_id: { $in: quizIds } });
  
    if (!responses.length) return 0;
  
    // Calculate the total score and the number of responses
    const totalScore = responses.reduce((sum, response) => sum + Number(response.score || 0), 0);
    const totalResponses = responses.length;
  
    return totalResponses > 0 ? totalScore / totalResponses : 0;
  }
}  