import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuickNote } from './models/quick-note.model';

@Injectable()
export class QuickNotesService {
  constructor(
    @InjectModel(QuickNote.name) private readonly quickNoteModel: Model<QuickNote>,
  ) {}

  async createQuickNote(userId: string, courseId: string, content: string): Promise<QuickNote> {
    return this.quickNoteModel.create({ userId, courseId, content });
  }

  async getQuickNotes(userId: string, courseId: string): Promise<QuickNote[]> {
    return this.quickNoteModel.find({ userId, courseId }).exec();
  }

  async updateQuickNote(noteId: string, content: string): Promise<QuickNote> {
    return this.quickNoteModel.findByIdAndUpdate(noteId, { content }, { new: true }).exec();
  }

  async deleteQuickNote(noteId: string): Promise<void> {
    await this.quickNoteModel.findByIdAndDelete(noteId).exec();
  }
}
