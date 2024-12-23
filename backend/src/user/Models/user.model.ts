import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { course } from '../../course/Model/course.nodel'; // Assuming course model is in the same directory

@Schema()
export class user {
  @Prop()
  user_Id: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password_hash: string;

  @Prop()
  role: string;

  @Prop()
  profile_picture_url: string;

  @Prop()
  created_at: Date;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'course' }] })
  courses: course[]; // Reference to the course model
}

export const UserSchema = SchemaFactory.createForClass(user);
