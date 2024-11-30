import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import  Mongoose,{HydratedDocument}  from "mongoose"


@Schema()
export class course{

    @Prop()
    course_Id: String;
    
    @Prop()
    title: String;

    @Prop()
    description: String;

    @Prop()
    category: String;

    @Prop()
    difficulty_level: String;

    @Prop()
    created_by: String;

    @Prop()
    created_at: Date;

}
export const CourseSchema = SchemaFactory.createForClass(course);

