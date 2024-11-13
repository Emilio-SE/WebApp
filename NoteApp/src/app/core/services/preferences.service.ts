import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  private _http = inject(HttpClient);
  private _toastrSvc = inject(ToastrService);

  constructor() {
    this.restoreTheme();
  }

  public restoreTheme(): Promise<boolean> {
    const result = new Promise<boolean>((resolve, reject) => {
      document.body.classList.remove(this.getCurrentTheme());
      const theme = localStorage.getItem('theme');
      if (theme) {
        document.body.classList.add(theme);
        resolve(true);
      } else {
        this._http.get(environment.preferences).subscribe({
          next: (res: any) => {
            document.body.classList.add(res.theme);
            localStorage.setItem('theme', res.theme);
            resolve(true);
          },
          error: (err) => {
            this._toastrSvc.error('Error al guardar el tema', 'Error');
            reject(false);
          },
        });
      }
    });
    return result;
  }

  toggleTheme() {
    const currentTheme = this.getCurrentTheme();
    document.body.classList.remove(currentTheme);

    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.classList.add(nextTheme);
    localStorage.setItem('theme', nextTheme);

    this._http.patch(environment.preferences, { theme: nextTheme }).subscribe({
      error: (err) => {
        console.log(err);
        this._toastrSvc.error('Error al guardar el tema', 'Error');
      },
    });
  }

  getCurrentTheme(): 'dark' | 'light' {
    const values = document.body.classList.value;
    return values.includes('dark') ? 'dark' : 'light';
  }

  public isDarkTheme(): boolean {
    return this.getCurrentTheme() === 'dark';
  }
}
