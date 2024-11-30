import { TestBed } from '@angular/core/testing';
import { PreferencesService } from './preferences.service';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { environment } from '../../../../environments/environment';

describe('PreferencesService', () => {
  let prefSvc: PreferencesService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideToastr(),
        PreferencesService,
        ToastrService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    prefSvc = TestBed.inject(PreferencesService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('Debería crear el servicio', () => {
    expect(prefSvc).toBeTruthy();
  });

  it('Debería restaurar el tema desde localStorage si está disponible', async () => {
    spyOn(localStorage, 'getItem').and.returnValue('dark');
    spyOn(document.body.classList, 'add');
    spyOn(document.body.classList, 'remove');

    const result = await prefSvc.restoreTheme();

    expect(result).toBeTrue();
    expect(document.body.classList.add).toHaveBeenCalledWith('dark');
  });

  it('Debería restaurar el tema desde el servidor si no está en localStorage', async () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');
    spyOn(document.body.classList, 'add');
    spyOn(document.body.classList, 'remove');
    spyOn(httpClient, 'get').and.returnValue(of({ theme: 'dark' }));

    const result = await prefSvc.restoreTheme();

    expect(result).toBeTrue();
    expect(httpClient.get).toHaveBeenCalledWith(environment.preferences);
    expect(document.body.classList.add).toHaveBeenCalledWith('dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  //
  it('Debería cambiar de tema claro a oscuro', () => {
    spyOn(document.body.classList, 'remove');
    spyOn(document.body.classList, 'add');
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.returnValue('light');

    prefSvc.toggleTheme();

    expect(document.body.classList.remove).toHaveBeenCalledWith('light');
    expect(document.body.classList.add).toHaveBeenCalledWith('dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('Debería cambiar de tema oscuro a claro', () => {
    document.body.classList.remove('light');
    document.body.classList.add('dark');

    spyOn(document.body.classList, 'remove');
    spyOn(document.body.classList, 'add');
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.returnValue('dark');

    prefSvc.toggleTheme();

    expect(document.body.classList.remove).toHaveBeenCalledWith('dark');
    expect(document.body.classList.add).toHaveBeenCalledWith('light');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('Deberia retornar true cuando es tema oscuro', () => {
    spyOn(prefSvc, 'getCurrentTheme').and.returnValue('dark');
    expect(prefSvc.isDarkTheme()).toBeTrue();
  });

  it('Debería retornar false cuando es tema claro', () => {
    spyOn(prefSvc, 'getCurrentTheme').and.returnValue('light');
    expect(prefSvc.isDarkTheme()).toBeFalse();
  });
});
