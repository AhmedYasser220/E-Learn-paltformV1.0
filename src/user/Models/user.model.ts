import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import  Mongoose,{HydratedDocument}  from "mongoose"


@Schema()
export class user{
    @Prop()
    user_Id: string;
    
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password_hash: string;

    @Prop()
    role: string;

    @Prop()
    profile_picture_url: string;

    @Prop()
    created_at: Date;

}
export const UserSchema = SchemaFactory.createForClass(user);

