import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesService } from '../../../model/services/notes.service';
import { Note } from '../../../model/interfaces/note.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-note',
  templateUrl: './manage-note.component.html',
  styleUrls: ['./manage-note.component.css'],
})
export class ManageNoteComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _noteSvc = inject(NotesService);
  private _toastrSvc = inject(ToastrService);

  @Input() public noteId: string = '';
  @Output() public close: EventEmitter<boolean> = new EventEmitter<boolean>();

  public form: FormGroup;

  constructor() {
    this.form = this._fb.group({
      title: ['', [Validators.required]],
      note: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.noteId) {
      this.getNote();
    }
  }

  private getNote() {
    this._noteSvc.getNote(this.noteId).subscribe({
      next: (note: Note) => {
        this.form.patchValue({
          title: note.title,
          note: note.note,
        });
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  public saveNote() {
    if (this.form.invalid) {
      this._toastrSvc.warning('Todos los campos son requeridos', 'Advertencia');
      return;
    }

    if (this.noteId) {
      this.updateNote();
    } else {
      this.createNote();
    }
  }

  private createNote() {
    this._noteSvc.createNote(this.form.value).subscribe({
      next: () => {
        this._toastrSvc.success('Nota creada correctamente', 'Nota');
        this.closeModal(true);
      },
      error: (error: any) => {
        this._toastrSvc.error('Ocurrió un error al crear la nota', 'Error');
      },
    });
  }

  private updateNote() {
    this._noteSvc.updateNote(this.form.value, this.noteId).subscribe({
      next: () => {
        this._toastrSvc.success('Nota actualizada correctamente', 'Nota');
        this.closeModal(true);
      },
      error: (error: any) => {
        this._toastrSvc.error(
          'Ocurrió un error al actualizar la nota',
          'Error'
        );
      },
    });
  }

  public closeModal(result: boolean) {
    this.close.emit(result);
  }
}
