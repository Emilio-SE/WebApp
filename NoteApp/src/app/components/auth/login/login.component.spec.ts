import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginService } from '../model/services/login.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Validators } from '@angular/forms';

describe('Login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        provideToastr(),
        LoginService,
        ToastrService,
      ],
      imports: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('Debería crear el componente', () => {
    expect(component.form).toBeTruthy();
  });

  it('Debería tener un control de formulario de email con validadores requeridos y de email', () => {
    const control = component.form.get('email');
    expect(control).toBeTruthy();
    expect(control?.hasValidator(Validators.required)).toBeTrue();
    expect(control?.hasValidator(Validators.email)).toBeTrue();
  });

  it('Debería tener un control de formulario de contraseña con validador requerido', () => {
    const control = component.form.get('password');
    expect(control).toBeTruthy();
    expect(control?.hasValidator(Validators.required)).toBeTrue();
  });

  it('Debería marcar el email como inválido cuando está vacío', () => {
    const control = component.form.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });

  it('Debería marcar el email como inválido cuando no tiene un formato de email válido', () => {
    const control = component.form.get('email');
    control?.setValue('invalidemail.com');
    expect(control?.valid).toBeFalse();
  });

  it('Debería marcar la contraseña como inválida cuando está vacía', () => {
    const control = component.form.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });

  it('Debería marcar el email como válido cuando se proporciona un email válido', () => {
    const control = component.form.get('email');
    control?.setValue('test@example.com');
    expect(control?.valid).toBeTrue();
  });

  it('Debería marcar la contraseña como válida cuando se proporciona un valor', () => {
    const control = component.form.get('password');
    control?.setValue('password123');
    expect(control?.valid).toBeTrue();
  });

  it('Debería enviar el formulario cuando el email y la contraseña son válidos', () => {
    const controlEmail = component.form.get('email');
    const controlPassword = component.form.get('password');
    
    controlEmail?.setValue('test@example.com');
    controlPassword?.setValue('password123');
    
    expect(component.form.valid).toBeTrue();
  });

  it('No debería enviar el formulario cuando el email y la contraseña son válidos', () => {
    const controlEmail = component.form.get('email');
    const controlPassword = component.form.get('password');
    
    controlEmail?.setValue('invalidemail');
    controlPassword?.setValue('password123');
    
    expect(component.form.valid).toBeFalse();
  });

  it('No debería enviar el formulario cuando la contraseña está vacía', () => {
    const controlEmail = component.form.get('email');
    const controlPassword = component.form.get('password');
    
    controlEmail?.setValue('test@example.com');
    controlPassword?.setValue('');
    
    expect(component.form.valid).toBeFalse();
  });
});
