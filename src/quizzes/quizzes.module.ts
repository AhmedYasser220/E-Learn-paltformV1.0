import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizzesSchema } from './Model/quizzes.model';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { ModulesModule } from '../modules/modules.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'quizzes', schema: QuizzesSchema }]), 
    ModulesModule,
  ],
  providers: [QuizzesService],
  controllers: [QuizzesController]
})
export class QuizzesModule {}
