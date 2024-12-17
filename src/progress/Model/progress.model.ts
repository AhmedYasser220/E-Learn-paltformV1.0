import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import  Mongoose,{HydratedDocument, Types}  from "mongoose"

export type progressDocument = HydratedDocument<progress>;


@Schema()
export class progress{

    @Prop()
    progress_id: String;
    
    @Prop({ type: Mongoose.Schema.Types.ObjectId, ref: 'User' }) // Reference to the User schema
    user_id: Types.ObjectId;

    @Prop({ type: Mongoose.Schema.Types.ObjectId, ref: 'Course' }) // Reference to the Course schema
    course_id: Types.ObjectId;

    @Prop()
     completion_percentage: Number;

    @Prop()
    last_accessed: Date;

}
export const progressSchema = SchemaFactory.createForClass(progress);

