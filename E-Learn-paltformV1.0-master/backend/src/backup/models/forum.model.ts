import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ForumThread extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true })
  authorId: string;

  @Prop([{
    body: String,
    authorId: String,
    createdAt: Date
  }])
  replies: Array<{
    body: string;
    authorId: string;
    createdAt: Date;
  }>;
}

export const ForumThreadSchema = SchemaFactory.createForClass(ForumThread);