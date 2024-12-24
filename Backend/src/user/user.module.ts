import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { user, UserSchema } from './Models/user.schema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: user.name, schema: UserSchema }]),
    
  ],
  

  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
