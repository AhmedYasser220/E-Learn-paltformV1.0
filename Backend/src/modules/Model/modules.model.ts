import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import  Mongoose,{HydratedDocument}  from "mongoose"


@Schema()
export class modules{

    @Prop()
    module_id: string;
    
    @Prop()
    course_id: string;

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    resources: string [];

    @Prop()
    created_at: Date;

}
export const modulesSchema = SchemaFactory.createForClass(modules);

