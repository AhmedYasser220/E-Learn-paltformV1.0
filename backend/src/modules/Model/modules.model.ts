import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import  Mongoose,{HydratedDocument}  from "mongoose"


@Schema()
export class modules{

    @Prop()
    module_id: String;
    
    @Prop()
    course_id: String;

    @Prop()
    title: String;

    @Prop()
    content: String;

    @Prop()
    resources: String [];

    @Prop()
    created_at: Date;

}
export const modulesSchema = SchemaFactory.createForClass(modules);

