import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from '../../model/interfaces/note.interface';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note: Note | undefined;
  @Output() openDetails: EventEmitter<Note> = new EventEmitter<Note>();
  @Output() openDelete: EventEmitter<Note> = new EventEmitter<Note>();
  @Output() openEdit: EventEmitter<Note> = new EventEmitter<Note>();

  constructor() { }

  ngOnInit() {
  }

  public openDetailsModal() {
    this.openDetails.emit(this.note);
  }

  public openDeleteModal() {
    this.openDelete.emit(this.note);
  }

  public openEditModal() {
    this.openEdit.emit(this.note);
  }

}
