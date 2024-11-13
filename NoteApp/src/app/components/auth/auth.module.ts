import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './model/services/login.service';
import { AuthGuard } from '../../core/guards/guard.guard';
import { CreateAccountComponent } from './create-account/create-account.component';

const routes: Routes  = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create',
    component: CreateAccountComponent,
    canActivate: [AuthGuard],
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent, CreateAccountComponent],
  exports: [LoginComponent],
  providers: [LoginService]
})
export class AuthModule { }
