import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from'./Models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Create a new user
   * @param user Partial<User> - The user data to be created
   * @returns The created user document
   */
  async create(user: Partial<User>): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  /**
   * Get all users
   * @returns List of all user documents
   */
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
   * Get users by role
   * @param role string - The role to filter users by
   * @returns List of users with the specified role
   */
  async findAllByRole(role: string): Promise<User[]> {
    return this.userModel.find({ role }).exec();
  }

  /**
   * Find a user by ID
   * @param userId string - The unique user ID
   * @returns The user document if found, or null if not
   */
  async findById(userId: string): Promise<User | null> {
    return this.userModel.findOne({ user_Id: userId }).exec();
  }

  /**
   * Update a user by ID
   * @param userId string - The unique user ID
   * @param updates Partial<User> - The updates to be applied
   * @returns The updated user document
   */
  async update(userId: string, updates: Partial<User>): Promise<User | null> {
    return this.userModel
      .findOneAndUpdate({ user_Id: userId }, updates, { new: true }) // Return the updated document
      .exec();
  }

  /**
   * Delete a user by ID
   * @param userId string - The unique user ID
   * @returns The deleted user document, or null if not found
   */
  async delete(userId: string): Promise<User | null> {
    return this.userModel.findOneAndDelete({ user_Id: userId }).exec();
  }
}
export { UserDocument, User };

