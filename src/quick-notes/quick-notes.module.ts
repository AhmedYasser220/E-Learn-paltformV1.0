import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuickNotesService } from './quick-notes.service';
import { QuickNotesController } from './quick-notes.controller';
import { QuickNote, QuickNoteSchema } from './models/quick-note.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: QuickNote.name, schema: QuickNoteSchema }]),
  ],
  controllers: [QuickNotesController],
  providers: [QuickNotesService],
})
export class QuickNotesModule {}
