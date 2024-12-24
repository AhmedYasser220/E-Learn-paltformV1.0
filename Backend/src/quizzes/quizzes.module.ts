import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { quizzes, QuizzesSchema } from './Model/quizzes.model';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { modules, ModulesSchema } from 'src/modules/Model/modules.model';
import { UserModule } from 'src/user/user.module';
import { user, UserSchema } from 'src/user/Models/user.schema';
import { ModulesModule } from 'src/modules/modules.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: quizzes.name, schema: QuizzesSchema },
      { name: user.name, schema: UserSchema },
      { name: modules.name, schema: ModulesSchema },
    ]),
    ModulesModule,
    UserModule,
  ],
  providers: [QuizzesService],
  controllers: [QuizzesController],
})
export class QuizzesModule {}
