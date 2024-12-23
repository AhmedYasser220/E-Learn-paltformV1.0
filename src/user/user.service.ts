import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from './Models/user.model'; 

@Injectable()
export class UserService {
  constructor(@InjectModel(user.name) private readonly userModel: Model<user>) {}

  async searchStudents(filters: any): Promise<user[]> {
    const query = { role: 'student' }; 
    if (filters.name) query['name'] = { $regex: filters.name, $options: 'i' };

    return this.userModel.find(query).exec();
  }

  async searchInstructors(filters: any): Promise<user[]> {
    const query = { role: 'instructor' }; // Only fetch users with role 'instructor'
    if (filters.name) query['name'] = { $regex: filters.name, $options: 'i' };

    return this.userModel.find(query).exec();
  }
}
