import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../model/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Routes } from '../../../core/const/routes.const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private _authService = inject(AuthService);
  private _loginService = inject(LoginService);
  private _fb = inject(FormBuilder);
  private _tastrService = inject(ToastrService);
  private _router = inject(Router);

  public form: FormGroup;

  constructor() {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  public login() {
    if (this.form.invalid) {
      this._tastrService.error('Formulario Inválido');
      return;
    }

    this._loginService.login(this.form.value).subscribe({
      next: (data) => {
        this._authService.setToken(data.token);
        this._router.navigate([Routes.REDIRECT_AFTER_LOGIN]);
      },
      error: (err) => {
        this._tastrService.error(err.error.message);
      },
    });
  }

  public get email() {
    return this.form.get('email') as FormControl;
  }
}
