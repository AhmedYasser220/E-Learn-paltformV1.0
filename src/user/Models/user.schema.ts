/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose'; // Import HydratedDocument

export type UserDocument = HydratedDocument<user>;

@Schema()
export class user {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['admin', 'instructor', 'student'] })
  role: string;

  @Prop({ default: null })
  profile_picture_url: string;

  @Prop({ default: () => new Date() })
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(user);
