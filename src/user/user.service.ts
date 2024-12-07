
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from './Models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(user.name) private userModel: Model<user>) {}

  async getUserProfile(user_Id: string): Promise<user | null> {
    try {
      return await this.userModel.findOne({ user_Id }).exec();
    } catch (error) {
      throw new Error('Error fetching user profile');
    }
  }

  async updateUserProfile(user_Id: string, updateData: Partial<user>): Promise<user | null> {
    try {
      return await this.userModel.findOneAndUpdate({ user_Id }, updateData, { new: true }).exec();
    } catch (error) {
      throw new Error(`Error updating user profile: ${error.message}`);
    }
  }
}

//Partial<T>: Makes all properties in T optional.
//Promise<T>: Represents an asynchronous operation that resolves to type T.