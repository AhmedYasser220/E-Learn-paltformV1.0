import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { ModulesModule } from './modules/modules.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { ResponsesModule } from './responses/responses.module';
import { ProgressModule } from './progress/progress.module';
import { QuickNotesModule } from './quick-notes/quick-notes.module';

@Module({
  imports: [
    UserModule,
    CourseModule,
    ModulesModule,
    QuizzesModule,
    ResponsesModule,
    ProgressModule,
    QuickNotesModule, 
    MongooseModule.forRoot('mongodb+srv://Wightnight120:Qazxsw!!@e-learndb.ksmzg.mongodb.net/'), // MongoDB connection
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
