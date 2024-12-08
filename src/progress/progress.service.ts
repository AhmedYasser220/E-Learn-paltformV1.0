/* eslint-disable @typescript-eslint/no-unused-vars */
import { responses } from './../responses/Model/responses.model';
import { quizzes } from './../quizzes/Model/quizzes.model';
import { course, CourseSchema } from './../course/Model/course.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { progress } from './Model/progress.model';
import { user } from 'src/user/Models/user.model';
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
      existingProgress.completion_percentage = createProgressDto.completion_percentage;
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
    // Validate the instructor
    const instructor = await this.getUserByIdAndRole(
      instructorId,
      'instructor',
    );

    // Fetch all courses created by the instructor
    const courses = await this.courseModel.find({ created_by: instructorId });
    if (!courses.length) {
      throw new NotFoundException('No courses found for the instructor.');
    }
    const courseIds = courses.map((course) => course.course_Id);
    const progresses = await this.fetchProgressByCourseIds(courseIds);
    const totalStudents = courses.length;

    // Calculate progress metrics
    const averageCompletionRate = progresses.reduce(
      (sum, progress) => sum + progress.completion_percentage,
      0,
    );

    const averageAssessmentScore =
      await this.getAverageAssessmentScore(courseIds);

    return {
      instructorId,
      instructorName: instructor.name,
      instructorEmail: instructor.email,
      totalCourses: courses.length,
      totalStudents,
      averageCompletionRate,
      averageAssessmentScore,
    };
  }

  // Validate user by ID and role
  async getUserByIdAndRole(userId: string, role: string) {
    const user = await this.userModel.findOne({ user_Id: userId, role });
    if (!user) {
      throw new NotFoundException('User with the specified role not found.');
    }
    return user;
  }

  async fetchProgressByCourseIds(courseIDs: string[]) {
    const progresses = [];
    for (const courseID of courseIDs) {
      // Fetch progress records for the course
      const courseProgress = await this.progressModel.find({
        course_id: courseID,
      });
      progresses.push(...courseProgress);
    }
    return progresses;
  }

  async getAverageAssessmentScore(courseIDs: string[]) {
    const quizzes = [];
    for (const courseID of courseIDs) {
      const courseQuizzes = await this.fetchQuizzesByCourseId(courseID);
      quizzes.push(...courseQuizzes);
    }

    const responses = [];
    for (const quiz of quizzes) {
      const quizResponses = await this.fetchResponsesByQuizId(quiz.quiz_id);
      responses.push(...quizResponses);
    }

    const totalScore = responses.reduce(
      (sum, response) => sum + (response.score || 0),
      0,
    );
    return totalScore / Math.max(responses.length, 1);
  }

  async fetchQuizzesByCourseId(courseID: string) {
    try {
      const quizzes = this.quizModel.find({ module_id: courseID });
      return quizzes;
    } catch (error) {
      console.error(`Error fetching quizzes for course ID ${courseID}:`, error);
      throw new Error('Error fetching quizzes');
    }
  }
  private async fetchResponsesByQuizId(quizId: string) {
    try {
      const responses = await this.responseModel.find({ quiz_id: quizId });
      return responses;
    } catch (error) {
      console.error(`Error fetching responses for quiz ID ${quizId}:`, error);
      throw new Error('Error fetching responses');
    }
  }
}
