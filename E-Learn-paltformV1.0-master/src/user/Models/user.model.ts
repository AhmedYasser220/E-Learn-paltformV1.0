import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

// Define allowed roles
export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  INSTRUCTOR = 'instructor',
}

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  user_Id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password_hash: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.STUDENT }) // Use enum for role validation
  role: UserRole;

  @Prop()
  profile_picture_url: string;

  @Prop({ default: () => new Date() }) // Default to current date
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
