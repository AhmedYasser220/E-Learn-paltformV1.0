import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose'; // Import HydratedDocument

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password_hash: string;

  @Prop({ default: 'student' }) // Default role
  role: string;

  @Prop({ default: null })
  profile_picture_url: string;

  @Prop({ default: () => new Date() })
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
