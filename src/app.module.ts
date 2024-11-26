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
@Module({
  imports: [UserModule,CourseModule,ModulesModule,QuizzesModule,ResponsesModule,ProgressModule,MongooseModule.forRoot('mongodb://Wightnight120:Qazxsw!!@e-learndb-shard-00-00.ksmzg.mongodb.net:27017,e-learndb-shard-00-01.ksmzg.mongodb.net:27017,e-learndb-shard-00-02.ksmzg.mongodb.net:27017/?ssl=true&replicaSet=atlas-pdfrlh-shard-0&authSource=admin&retryWrites=true&w=majority&appName=E-learnDB')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
