import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Request } from 'express';

import { NotesService } from './note.service';

import { Note } from './note.entity';
import { UpdateNoteDto } from './dto/update-note.dto';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class PreferencesController {
  constructor(private preferencesSvc: NotesService) {}

  @Get()
  async getNotes(@Req() req: Request): Promise<Note> {
    return await this.preferencesSvc.getNotes(req.user['id']);
  }

  @Get(':noteId')
  async getNote(
    @Req() req: Request,
    @Param('noteId') noteId: string,
  ): Promise<Note> {
    return await this.preferencesSvc.getNote(req.user['id'], noteId);
  }

  @Post()
  async createNote(
    @Req() req: Request,
    @Body() preferences: CreateNoteDto,
  ): Promise<Note> {
    return await this.preferencesSvc.createNote(req.user['id'], preferences);
  }

  @Patch(':noteId')
  async updateNote(
    @Req() req: Request,
    @Body() preferences: UpdateNoteDto,
    @Param('noteId') noteId: string,
  ): Promise<any> {
    return await this.preferencesSvc.updateNote(
      req.user['id'],
      noteId,
      preferences,
    );
  }

  @Delete(':noteId')
  async deleteNote(
    @Req() req: Request,
    @Param('noteId') noteId: string,
  ): Promise<any> {
    return await this.preferencesSvc.deleteNote(req.user['id'], noteId);
  }
}
