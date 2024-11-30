import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CreateAccountComponent } from "./create-account.component";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { LoginService } from '../model/services/login.service';
import { Validators } from '@angular/forms';

describe("Create", () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;

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
    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
  });

  it('Debería crear el componente', () => {
    expect(component.form).toBeTruthy();
  });

  it('Debería tener un control de formulario de nombre con validador requerido', () => {
    const control = component.form.get('name');
    expect(control).toBeTruthy();
    expect(control?.hasValidator(Validators.required)).toBeTrue();
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

  it('Debería tener un control de formulario de confirmar contraseña con validador requerido', () => {
    const control = component.form.get('confirmPassword');
    expect(control).toBeTruthy();
    expect(control?.hasValidator(Validators.required)).toBeTrue();
  });

  it('Debería marcar el nombre como inválido cuando está vacío', () => {
    const control = component.form.get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });

  it('Debería marcar el email como invalido cuando está vacío', () => {
    const control = component.form.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });

  it('Debería marcar el email como invalido cuando no tiene un formato de email valido', () => {
    const control = component.form.get('email');
    control?.setValue('invalidemail.com');
    expect(control?.valid).toBeFalse();
  });

  it('Debería marcar el email como invalido cuando esta vacio', () => {
    const control = component.form.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });

  it('Debería marcar confirmPassword como invalido cuando esta vacio', () => {
    const control = component.form.get('confirmPassword');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });

  it('Debería enviar el formulario cuando la contraseña y la confirmación de contraseña son iguales', () => {
    const passwordControl = component.form.get('password');
    const confirmPasswordControl = component.form.get('confirmPassword');
    
    passwordControl?.setValue('password123');
    confirmPasswordControl?.setValue('password123');
    
    expect(passwordControl?.value === confirmPasswordControl?.value).toBeTrue();
  });

  it('No debería enviar el formulario cuando la contraseña y la confirmación de contraseña no son iguales', () => {
    const passwordControl = component.form.get('password');
    const confirmPasswordControl = component.form.get('confirmPassword');
    
    passwordControl?.setValue('password123');
    confirmPasswordControl?.setValue('differentpassword');
    
    expect(passwordControl?.value === confirmPasswordControl?.value).toBeFalse();
  });
})