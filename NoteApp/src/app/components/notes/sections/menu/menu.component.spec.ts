import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { CommunicationService } from '../../model/services/communication.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let commSvc: CommunicationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [MenuComponent],
      providers: [CommunicationService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    commSvc = TestBed.inject(CommunicationService);
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia llamar a searchNotes cuando cambia el valor de searchTerm', () => {
    const searchControl = component.form.controls['searchTerm'];
    const searchTerm = 'new search';

    commSvc.searchTerm.subscribe((term) => {
      expect(term).toBe(searchTerm);
    });

    searchControl.setValue(searchTerm);
  });

  it('Deberia colocar addModalVisible en true cuando se llama a openAddModal', () => {
    component.openAddModal();
    expect(component.addModalVisible).toBeTrue();
  });

  it('Debería colocar addModalVisible en false cuando se llama a closeModal con resultado falso', () => {
    component.openAddModal();
    component.closeModal(false);
    expect(component.addModalVisible).toBeFalse();
  });
});
