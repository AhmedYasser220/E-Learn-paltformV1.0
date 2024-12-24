import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class quizzes {
  @Prop()
  quiz_id: string;

  @Prop()
  module_id: string;

  @Prop()
  questions: object[];

  @Prop()
  created_at: Date;
}
export const QuizzesSchema = SchemaFactory.createForClass(quizzes);
