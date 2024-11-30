import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { environment } from '../../../../../../environments/environment';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CreateAccount, Login, Token } from '../interfaces/login.interface';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [        
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        LoginService,
      ]
    })
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('Debería llamar al API de login y retornar un token', () => {
    const mockLoginData: Login = { email: 'test@example.com', password: 'password123' };
    const mockResponse: Token = { token: 'mock-token' };

    service.login(mockLoginData).subscribe(response => {
      expect(response.token).toBe('mock-token');
    });

    const req = httpMock.expectOne(environment.auth);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockLoginData);

    req.flush(mockResponse);
  });

  it('Debería llamar al API de createAccount y retornar una respuesta exitosa', () => {
    const mockAccountData: CreateAccount = { name: 'newUser', email: 'newuser@example.com', password: 'password123' };
    const mockResponse = { success: true };

    service.createAccount(mockAccountData).subscribe(response => {
      expect(response.success).toBeTrue();
    });

    const req = httpMock.expectOne(environment.register);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockAccountData);

    req.flush(mockResponse);
  });

});
