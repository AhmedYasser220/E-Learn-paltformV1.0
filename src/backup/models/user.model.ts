import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop([{
    courseId: String,
    enrollmentDate: Date,
    progress: Number
  }])
  enrolledCourses: Array<{
    courseId: string;
    enrollmentDate: Date;
    progress: number;
  }>;
}

export const UserSchema = SchemaFactory.createForClass(User);