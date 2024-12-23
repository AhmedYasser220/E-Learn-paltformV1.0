import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { ModulesModule } from './modules/modules.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { ResponsesModule } from './responses/responses.module';
import { ProgressModule } from './progress/progress.module';
import { ChatModule } from './chat/chat.module';
import { Forum } from './forum/forum.schema';
import { ForumModule } from './forum/forum.moddule';




@Module({
  imports: [UserModule,ModulesModule,QuizzesModule,ResponsesModule,ProgressModule,CourseModule,ForumModule,ChatModule,MongooseModule.forRoot('mongodb+srv://Wightnight120:Qazxsw!!@e-learndb.ksmzg.mongodb.net/')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
