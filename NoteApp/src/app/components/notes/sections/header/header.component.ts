import { Component, inject, OnInit } from '@angular/core';
import { PreferencesService } from '../../../../core/services/preferences.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private _preferencesSvc = inject(PreferencesService);
  private _authSvc = inject(AuthService);

  public isDarkTheme: boolean = false;

  constructor() {}

  ngOnInit() {
    this._preferencesSvc.restoreTheme().then(() => {
      this.isDarkTheme = this._preferencesSvc.isDarkTheme();
    });
  }

  public changeTheme() {
    this._preferencesSvc.toggleTheme();
  }

  public logout() {
    this._authSvc.logout();
  }

}
