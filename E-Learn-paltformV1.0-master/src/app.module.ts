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
import { BackupModule } from './backup/backup.module';

@Module({
  imports: [UserModule,CourseModule,ModulesModule,QuizzesModule,ResponsesModule,ProgressModule,BackupModule,MongooseModule.forRoot('mongodb://localhost:27017/e-ler')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

