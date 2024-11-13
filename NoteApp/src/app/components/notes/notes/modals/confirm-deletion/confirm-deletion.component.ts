import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrls: ['./confirm-deletion.component.css']
})
export class ConfirmDeletionComponent implements OnInit {

  @Output() public response: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public closeModal() {
    this.response.emit(false);
  }

  public confirm() {
    this.response.emit(true);
  }

}
