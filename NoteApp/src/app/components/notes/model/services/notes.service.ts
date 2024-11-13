import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateNote, Note, UpdateNote } from '../interfaces/note.interface';

@Injectable()
export class NotesService {
  private _http = inject(HttpClient);

  constructor() {}

  public getNotes(): Observable<Note[]> {
    return this._http.get<Note[]>(environment.notes);
  }

  public getNote(id: string): Observable<Note> {
    return this._http.get<Note>(`${environment.notes}/${id}`);
  }

  public updateNote(note: UpdateNote, noteId: string): Observable<UpdateNote> {
    return this._http.patch<UpdateNote>(`${environment.notes}/${noteId}`, note);
  }

  public createNote(note: CreateNote): Observable<CreateNote> {
    return this._http.post<CreateNote>(environment.notes, note);
  }

  public deleteNote(noteId: string): Observable<void> {
    return this._http.delete<void>(`${environment.notes}/${noteId}`);
  }
}
