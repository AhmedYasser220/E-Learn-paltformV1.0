import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { ModuleSchema} from './Model/modules.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'module', schema: ModuleSchema }]), // Register schema here
  ],
  exports: [
    MongooseModule, // Export MongooseModule to make `modulesModel` available in other modules
  ],
  providers: [ModulesService],
  controllers: [ModulesController]
})
export class ModulesModule {}
