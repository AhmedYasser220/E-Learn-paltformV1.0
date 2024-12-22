import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { ModulesModule } from './modules/modules.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { ResponsesModule } from './responses/responses.module';
import { ProgressModule } from './progress/progress.module';
import { AuthModule } from './auth/auth.module';
import { configDotenv } from 'dotenv';
import { QuickNotesModule } from './quick-notes/quick-notes.module';

@Module({
  imports: [
    UserModule,
    CourseModule,
    ModulesModule,
    QuizzesModule,
    ResponsesModule,
    QuickNotesModule,
    ProgressModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forRoot('mongodb://localhost:27017'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
