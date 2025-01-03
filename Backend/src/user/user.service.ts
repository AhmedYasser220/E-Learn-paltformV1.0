import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user, UserDocument } from 'src/user/Models/user.schema';
import { updateUserDTo } from './Dtos/updateUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(user.name) private UserModel: Model<user>) {}

  async create(studentData: user): Promise<UserDocument> {
    const newStudent = new this.UserModel(studentData); // Create a new student document
    const user = await newStudent.save();
    return user; // Save it to the database
  }
  async findByName(username: string): Promise<UserDocument> {
    return await this.UserModel.findOne({ username }); // Fetch a student by username
  }
  async findByEmail(email: string): Promise<UserDocument> {
    const user = await this.UserModel.findOne({ email });
    return user; // Fetch a student by username
  }
  // Get all students
  async findAll(): Promise<UserDocument[]> {
    let students = await this.UserModel.find(); // Fetch all students from the database
    console.log(students);
    return students;
  }

  // View personal info (User Profile Management)
  async viewProfile(id: string): Promise<UserDocument> {
    // Fetch the user's profile information by ID
    const userProfile = await this.UserModel.findById(id);
    if (!userProfile) {
      throw new Error(`User with ID ${id} not found`); // If no user found, throw an error
    }
    return userProfile; // Return the user's profile data
  }
  // Update personal info (User Profile Management)
  async updateProfile(
    id: string,
    updateData: updateUserDTo,
  ): Promise<UserDocument> {
    // Find the user by ID and update their profile
    const updatedUser = await this.UserModel.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
    });
    if (!updatedUser) {
      throw new Error('Unable to update user profile');
    }
    return updatedUser;
  }

  // Delete a student by ID
  async delete(id: string): Promise<UserDocument> {
    return await this.UserModel.findByIdAndDelete(id); // Find and delete the student
  }

  async searchStudents(filters: any): Promise<user[]> {
    const query = { role: 'student' }; // Only fetch users with role 'student'
    if (filters.name) query['name'] = { $regex: filters.name, $options: 'i' };

    return this.UserModel.find(query).exec();
  }

  async searchInstructors(filters: any): Promise<user[]> {
    const query = { role: 'instructor' }; // Only fetch users with role 'instructor'
    if (filters.name) query['name'] = { $regex: filters.name, $options: 'i' };

    return this.UserModel.find(query).exec();
  }
}
