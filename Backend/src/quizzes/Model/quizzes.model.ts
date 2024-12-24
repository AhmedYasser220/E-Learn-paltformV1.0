import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import  Mongoose,{HydratedDocument}  from "mongoose"


@Schema()
export class quizzes{

    @Prop()
    quiz_id: String;
    
    @Prop()
    module_id: String;
    
    @Prop({ type: [{ questionText: String, options: [String], correctAnswer: String }], required: true })
    questions: { questionText: string; options: string[]; correctAnswer: string }[];

    @Prop()
    created_at: Date;

}
export const QuizzesSchema = SchemaFactory.createForClass(quizzes);
