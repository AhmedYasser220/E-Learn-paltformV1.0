/* eslint-disable @typescript-eslint/no-unused-vars */
import { responses } from './../responses/Model/responses.model';
import { quizzes } from './../quizzes/Model/quizzes.model';
import { course } from './../course/Model/course.model';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { progress } from './Model/progress.model';
import { user } from 'src/user/Models/user.schema';
import { InstructorAnalyticsDto } from './dto/instructoranalytics.dto';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

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


  async createOrUpdateProgress(
    createProgressDto: CreateProgressDto,
  ): Promise<progress> {
    const {
      userId,
      courseId,
      completion_percentage,
      completedAt,
      moduleRatings,
      courseRating,
      instructorRating,
    } = createProgressDto;
  
    // Check if progress record already exists
    const existingProgress = await this.progressModel.findOne({
      userId,
      courseId,
    });
  
    if (existingProgress) {
      // Update the existing progress record
      existingProgress.completion_percentage = completion_percentage;
      if (completion_percentage >= 100) {
        existingProgress.courseCompleted = true;
        existingProgress.completedAt = completedAt || new Date(); // Set `completedAt` only if the course is completed
      }
  
      // Update moduleRatings if provided
      if (moduleRatings) {
        existingProgress.moduleRatings = {
          ...existingProgress.moduleRatings,
          ...moduleRatings,
        };
      }
  
      // Update courseRating if provided
      if (courseRating !== undefined) {
        existingProgress.courseRating = courseRating;
      }
  
      // Update instructorRating if provided
      if (instructorRating !== undefined) {
        existingProgress.instructorRating = instructorRating;
      }
  
      return await existingProgress.save();
    } else {
      // Create a new progress record
      const newProgress = new this.progressModel({
        userId,
        courseId,
        completion_percentage,
        completedAt: completion_percentage >= 100 ? completedAt || new Date() : null, // Set `completedAt` only if the course is completed
        courseCompleted: completion_percentage >= 100, // Mark course as completed if 100%
        moduleRatings: moduleRatings || {}, // Default to an empty object if not provided
        courseRating: courseRating || null, // Default to null if not provided
        instructorRating: instructorRating || null, // Default to null if not provided
      });
  
      return await newProgress.save();
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
    if (!courses || courses.length === 0) {
      throw new NotFoundException('No courses found for the instructor.');
    }
    const courseIds = courses.map((course) => course.course_Id);

    // Fetch progress records for all courses created by the instructor
    const progresses = await this.progressModel.find({
      courseId: { $in: courseIds },
    });

    // Total number of students who have progress records
    const totalStudents = progresses ? progresses.length : 0;

    // Filter progress records for completed courses
    const completedProgresses = progresses
      ? progresses.filter((progress) => progress.completion_percentage === 100)
      : [];

    // Calculate completion rate
    const totalCompleted = completedProgresses.length;
    const completionRate =
      totalStudents > 0 ? (totalCompleted / totalStudents) * 100 : 0;

    // Calculate average assessment score
    const averageAssessmentScore =
      await this.calculateAverageAssessmentScore(courseIds);

    // Calculate Average Module Ratings
    const moduleRatings = this.calculateAverageModuleRatings(progresses);

    // Calculate Average Course Ratings
    const averageCourseRating = this.calculateAverageCourseRating(progresses);

    // Calculate Average Instructor Ratings
    const instructorRating = this.calculateAverageInstructorRatings(progresses);

    return {
      instructorId,
      instructorName: instructor.name,
      instructorEmail: instructor.email,
      totalCourses: courses.length,
      totalStudents,
      averageCompletionRate: completionRate,
      averageAssessmentScore,
      moduleRatings,
      averageCourseRating,
      instructorRating,
    };
  }

  private async calculateAverageAssessmentScore(
    courseIds: string[],
  ): Promise<number> {
    // Fetch all quizzes for the given course IDs
    const quizzes = await this.quizModel.find({
      module_id: { $in: courseIds },
    });
    if (!quizzes || quizzes.length === 0) return 0;

    // Fetch all responses for the quizzes
    const quizIds = quizzes.map((quiz) => quiz.quiz_id);
    const responses = await this.responseModel.find({
      quiz_id: { $in: quizIds },
    });
    if (!responses || responses.length === 0) return 0;

    // Calculate the total score and the number of responses
    const totalScore = responses.reduce(
      (sum, response) => sum + Number(response.score || 0),
      0,
    );
    const totalResponses = responses.length;

    return totalResponses > 0 ? totalScore / totalResponses : 0;
  }

  private calculateAverageModuleRatings(progresses: progress[] | null): any {
    if (!progresses || progresses.length === 0) {
      return {};
    }

    const moduleRatings: {
      [moduleId: string]: { total: number; count: number };
    } = {};

    progresses.forEach((progress) => {
      if (progress.moduleRatings) {
        for (const moduleId in progress.moduleRatings) {
          if (progress.moduleRatings.hasOwnProperty(moduleId)) {
            if (!moduleRatings[moduleId]) {
              moduleRatings[moduleId] = { total: 0, count: 0 };
            }
            moduleRatings[moduleId].total += progress.moduleRatings[moduleId];
            moduleRatings[moduleId].count++;
          }
        }
      }
    });

    const averageRatings: { [moduleId: string]: number } = {};
    for (const moduleId in moduleRatings) {
      if (moduleRatings.hasOwnProperty(moduleId)) {
        averageRatings[moduleId] =
          moduleRatings[moduleId].total / moduleRatings[moduleId].count;
      }
    }
    return averageRatings;
  }

  private calculateAverageCourseRating(progresses: progress[] | null): number {
    if (!progresses || progresses.length === 0) return 0;
    let totalRating = 0;
    let count = 0;
    progresses.forEach((progress) => {
      if (progress.courseRating) {
        totalRating += progress.courseRating;
        count++;
      }
    });
    return count > 0 ? totalRating / count : 0;
  }

  private calculateAverageInstructorRatings(
    progresses: progress[] | null,
  ): number {
    if (!progresses || progresses.length === 0) return 0;
    let totalRating = 0;
    let count = 0;
    progresses.forEach((progress) => {
      if (progress.instructorRating) {
        totalRating += progress.instructorRating;
        count++;
      }
    });
    return count > 0 ? totalRating / count : 0;
  }
  async updateProgress(
    progressId: string,
    updateData: UpdateProgressDto,
  ): Promise<progress> {
    try {
      const updatedProgress = await this.progressModel.findByIdAndUpdate(
        progressId,
        updateData,
        { new: true, runValidators: true }, // Ensure validators are run on update
      );
      if (!updatedProgress) {
        throw new NotFoundException('Progress not found');
      }
      return updatedProgress;
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Handle specific validation errors
        throw new BadRequestException(
          'Validation failed. Check your input data.',
        );
      }
      throw error;
    }
  }
}
