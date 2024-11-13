import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../model/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreateAccount } from '../model/interfaces/login.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {

  private _fb = inject(FormBuilder);
  private _tastrService = inject(ToastrService);
  private _loginService = inject(LoginService);
  private _router = inject(Router);

  public form: FormGroup;

  constructor() {
    this.form = this._fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  public createAccount() {
    if (this.form.invalid) {
      this._tastrService.warning('Formulario Inválido', 'Advertencia');
      return;
    }

    if (
      this.form.get('password')!.value !==
      this.form.get('confirmPassword')!.value
    ) {
      this._tastrService.warning('Las contraseñas no coinciden', 'Advertencia');
      return;
    }

    const account: CreateAccount = {
      name: this.form.get('name')!.value,
      email: this.form.get('email')!.value,
      password: this.form.get('password')!.value,
    };

    this._loginService.createAccount(account).subscribe({
      next: () => {
        this._tastrService.success('Cuenta creada');
        this._router.navigate(['/login']);
      },
      error: (err) => {
        this._tastrService.error(err.error.message);
      },
    });
  }
}
