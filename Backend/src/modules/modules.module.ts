import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { ModulesSchema} from './Model/modules.model';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'module', schema: ModulesSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type'), false);
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
    }), // Register schema here
  ],
  exports: [
    MongooseModule, // Export MongooseModule to make `modulesModel` available in other modules
  ],
  providers: [ModulesService],
  controllers: [ModulesController]
})
export class ModulesModule {}
