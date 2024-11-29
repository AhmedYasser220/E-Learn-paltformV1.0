import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from './Models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(user.name) private userModel: Model<user>) {}

  async getUserProfile(user_Id: string): Promise<user> {
    return this.userModel.findOne({ user_Id }).exec(); //Executes the query and returns a promise that resolves to the user document
  }

  async updateUserProfile(user_Id: string, updateData: Partial<user>): Promise<user> {
    return this.userModel.findOneAndUpdate({ user_Id }, updateData, { new: true });
  }
}


//Partial<T>: Makes all properties in T optional.
//Promise<T>: Represents an asynchronous operation that resolves to type T.