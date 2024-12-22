import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import  Mongoose,{HydratedDocument}  from "mongoose"


@Schema()
export class responses{

    @Prop()
    response_id: String;
    
    @Prop()
    user_id: String;
    
    @Prop()
    quiz_id: String;

    @Prop()
    answers: Object[];

    @Prop()
    score: Number;

    @Prop()
    submitted_at: Date;

}
export const responsesSchema = SchemaFactory.createForClass(responses);

