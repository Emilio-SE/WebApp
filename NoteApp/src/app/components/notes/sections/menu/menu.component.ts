import { Component, inject, OnInit } from '@angular/core';
import { CommunicationService } from '../../model/services/communication.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  private _commSvc = inject(CommunicationService);

  public searchTerm: string = '';
  public addModalVisible: boolean = false;

  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      searchTerm: new FormControl('', []),
    });
  }

  ngOnInit() {
    this.form.get('searchTerm')?.valueChanges.subscribe((value) => {
      this._commSvc.searchNotes(value);
    });
  }

  public closeModal(result: boolean) {
    if (result) {
      this._commSvc.updateNotes();
    }
    this.addModalVisible = false;
  }

  public openAddModal() {
    this.addModalVisible = true;
  }
}
