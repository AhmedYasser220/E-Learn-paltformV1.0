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

  // Get a student by ID
  async findById(id: string): Promise<UserDocument> {
    console.log(id);
    const student = await this.UserModel.findById(id); // Fetch a student by ID
    return student;
  }

  // Update a student's details by ID
  async update(id: string, updateData: updateUserDTo): Promise<UserDocument> {
    return await this.UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
    }); // Find and update the student
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
