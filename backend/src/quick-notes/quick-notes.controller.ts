import { Controller, Post, Get, Patch, Delete, Body, Query, Param } from '@nestjs/common';
import { QuickNotesService } from './quick-notes.service';

@Controller('quick-notes')
export class QuickNotesController {
  constructor(private readonly quickNotesService: QuickNotesService) {}

  @Post()
  async createQuickNote(
    @Body('userId') userId: string,
    @Body('courseId') courseId: string,
    @Body('content') content: string,
  ) {
    return this.quickNotesService.createQuickNote(userId, courseId, content);
  }

  @Get()
  async getQuickNotes(
    @Query('userId') userId: string,
    @Query('courseId') courseId: string,
  ) {
    return this.quickNotesService.getQuickNotes(userId, courseId);
  }

  @Patch(':id')
  async updateQuickNote(
    @Param('id') noteId: string,
    @Body('content') content: string,
  ) {
    return this.quickNotesService.updateQuickNote(noteId, content);
  }

  @Delete(':id')
  async deleteQuickNote(
    @Param('id') noteId: string,
  ) {
    await this.quickNotesService.deleteQuickNote(noteId);
    return { message: 'Note deleted successfully' };
  }
}
