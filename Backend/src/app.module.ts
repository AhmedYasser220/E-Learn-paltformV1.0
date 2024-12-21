import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { ModulesModule } from './modules/modules.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { ResponsesModule } from './responses/responses.module';
import { ProgressModule } from './progress/progress.module';
import { AuthModule } from './auth/auth.module';
import { configDotenv } from 'dotenv';
@Module({
  imports: [
    UserModule,
    CourseModule,
    ModulesModule,
    QuizzesModule,
    ResponsesModule,
    ProgressModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
   // MongooseModule.forRoot(process.env.MONGO_URI),
     MongooseModule.forRoot('mongodb://localhost/e-learning')

     // 'mongodb+srv://Wightnight120:Qazxsw!!@e-learndb.ksmzg.mongodb.net/',
    //MongooseModule.forRoot('mongodb+srv://Wightnight120:Qazxsw!!@e-learndb.ksmzg.mongodb.net/'),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
