import { Component, inject, OnInit } from '@angular/core';
import { PreferencesService } from '../../core/services/preferences.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  private _preferencesSvc = inject(PreferencesService);

  constructor() { 
    this._preferencesSvc.restoreTheme();
  }

  ngOnInit() {
  }

}
