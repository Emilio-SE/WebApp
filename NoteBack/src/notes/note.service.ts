import { HttpException, Injectable } from '@nestjs/common';

import { Note } from './note.entity';

import { UpdateNoteDto } from './dto/update-note.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { DataSnapshot, get, push, ref, set } from 'firebase/database';
import { db } from 'src/common/config/firebase.config';
import { RawNote } from './interfaces/firebase.interface';

@Injectable()
export class NotesService {
  private dbRef = ref(db, 'notes');

  constructor() {}

  public async getNotes(userId: string): Promise<any> {
    const snapshot: DataSnapshot = await get(this.dbRef);
    const notes: RawNote = snapshot.val();

    if (!notes) return [];
    
    const userNotes = Object.values(notes).filter(
      (p: any) => p.userId === userId,
    );

    if (!userNotes) return [];

    return userNotes.map((note) => {
      return {
        ...note,
        noteId: Object.keys(notes).find((key) => notes[key] === note),
      };
    });
  }

  public async getNote(userId: string, noteId: string): Promise<any> {
    const noteFound = await this.getNoteById(userId, noteId);

    return {
      ...noteFound,
      noteId,
    };
  }

  public async createNote(userId: string, note: CreateNoteDto): Promise<any> {
    const newNote: Note = {
      title: note.title,
      note: note.note,
      userId: userId,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      isPinned: false,
    };

    const pref = push(this.dbRef, newNote);
    return pref;
  }


  public async updateNote(
    userId: string,
    noteId: string,
    newNote: UpdateNoteDto,
  ): Promise<any> {
    const noteFound = await this.getNoteById(userId, noteId);

    noteFound.title =
      newNote.title === undefined ? noteFound.title : newNote.title;
    noteFound.note = newNote.note === undefined ? noteFound.note : newNote.note;
    noteFound.isPinned =
      newNote.isPinned === undefined ? noteFound.isPinned : newNote.isPinned;

    noteFound.modifiedAt = new Date().toISOString();

    await set(ref(db, `notes/${noteId}`), noteFound);

    return {
      ...noteFound,
      noteId,
    };
  }

  public async deleteNote(userId: string, noteId: string): Promise<any> {
    const noteFound = await this.getNoteById(userId, noteId);

    await set(ref(db, `notes/${noteId}`), null);

    return {
      ...noteFound,
      noteId,
    };
  }

  private async getNoteById(userId: string, noteId: string): Promise<any> {
    const snapshot: DataSnapshot = await get(this.dbRef);
    const notes: RawNote = snapshot.val();

    const noteFound: Note | undefined = notes[noteId];

    if (!noteFound || noteFound.userId !== userId) {
      throw new HttpException('Nota no encontrada', 404);
    }

    return noteFound;
  }

}
