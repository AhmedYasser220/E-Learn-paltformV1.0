import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Forum {
  @Prop({ required: true })
  courseId: string;  // The ID of the course this forum belongs to

  @Prop({ required: true })
  name: string;      // Forum's name

  @Prop({ required: true })
  description: string; // Forum's description

  @Prop({ default: Date.now })
  createdAt: Date;   // Date when the forum was created
}

export type ForumDocument = HydratedDocument<Forum>;
export const ForumSchema = SchemaFactory.createForClass(Forum);
