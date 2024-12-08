import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageSchema } from './model/message.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]), // Register the Message schema
  ],
  controllers: [MessageController], // Add the MessageController
  providers: [MessageService], // Add the MessageService
})
export class MessageModule {}
