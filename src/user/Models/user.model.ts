// src/user/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password_hash: string;

  @Prop({ enum: ['student', 'instructor'], required: true })
  role: string;  // Role field to store either student or instructor

  @Prop()
  profile_picture_url: string;

  @Prop()
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
