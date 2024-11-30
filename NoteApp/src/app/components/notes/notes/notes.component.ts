import { Component, inject, OnInit } from '@angular/core';
import { NotesService } from '../model/services/notes.service';
import { Note } from '../model/interfaces/note.interface';
import { ToastrService } from 'ngx-toastr';
import { CommunicationService } from '../model/services/communication.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  private _toastrSvc = inject(ToastrService);
  private _notesSvc = inject(NotesService);
  private _commSvc = inject(CommunicationService);

  public currentNote: Note | undefined;
  public isDetailsVisible: boolean = false;
  public isDeleteVisible: boolean = false;
  public isEditVisible: boolean = false;

  public searchTerm: string = '';
  public notes: Note[] = [];

  constructor() {}

  ngOnInit() {
    this.getNotes();
    this.updateSearchTerm();

    this._commSvc.getNotes.subscribe(() => {
      this.getNotes();
    });
  }

  private getNotes() {
    this._notesSvc.getNotes().subscribe({
      next: (notes: Note[]) => {
        this.notes = notes;
      },
      error: (error: any) => {
        this._toastrSvc.error('Ocurrió un error al obtener las notas', 'Error');
      },
    });
  }

  private updateSearchTerm() {
    this._commSvc.searchTerm.subscribe((term: string) => {
      this.searchTerm = term;
    });
  }

  public openDetails(note: Note) {
    this.currentNote = note;
    this.isDetailsVisible = true;
  }

  public openDelete(note: Note) {
    this.isDeleteVisible = true;
    this.currentNote = note;
  }

  public openEdit(note: Note) {
    this.currentNote = note;
    this.isEditVisible = true;
  }

  public closeDetails() {
    this.isDetailsVisible = false;
  }

  public closeEdit(result: boolean) {
    if (result) {
      this.updateNote();
    }
    this.isEditVisible = false;
  }


  public confirmDeletion(response: boolean) {
    if (response) {
      this.deleteNote();
      this.isDeleteVisible = false;
    } else {
      this.isDeleteVisible = false;
    }
  }

  private updateNote() {
    this._notesSvc.getNote(this.currentNote!.noteId).subscribe({
      next: (note: Note) => {
        //Sustituir el valor de la nota del arreglo por la que se obtuvo del servidor
        const index = this.notes.findIndex((n) => n.noteId === note.noteId);
        this.notes[index] = note;
      },
      error: (error: any) => {
        this._toastrSvc.error('Ocurrió un error al obtener la nota', 'Error');
      },
    });
  }

  
  private deleteNote() {
    this.isDeleteVisible = false;
    this._notesSvc.deleteNote(this.currentNote!.noteId).subscribe({
      next: () => {
        this.notes = this.notes.filter(
          (note) => note.noteId !== this.currentNote!.noteId
        );
        this.currentNote = undefined;
        this._toastrSvc.success('Nota eliminada correctamente', 'Nota');
      },
      error: (error: any) => {
        this._toastrSvc.error('Ocurrió un error al eliminar la nota', 'Error');
      },
    });
  }
}
