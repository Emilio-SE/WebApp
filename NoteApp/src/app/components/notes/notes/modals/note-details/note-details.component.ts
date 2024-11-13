import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from '../../../model/interfaces/note.interface';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {

  @Input() public note!: Note;
  @Output() public close: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  public closeModal() {
    this.close.emit();
  }

}
