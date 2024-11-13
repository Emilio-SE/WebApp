import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { CreateAccount, Login, Token } from '../interfaces/login.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
  private _http = inject(HttpClient);

  constructor() {}

  public login(data: Login): Observable<Token> {
    return this._http.post<Token>(environment.auth, data);
  }

  public createAccount(data: CreateAccount): Observable<any> {
    return this._http.post(environment.register, data);
  }

}
