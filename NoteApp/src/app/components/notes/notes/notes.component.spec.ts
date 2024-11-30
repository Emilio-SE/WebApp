import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesComponent } from './notes.component';
import { NotesService } from '../model/services/notes.service';
import { ToastrService } from 'ngx-toastr';
import { CommunicationService } from '../model/services/communication.service';
import { of, throwError } from 'rxjs';
import { Note } from '../model/interfaces/note.interface';
import { NotesPipe } from '../model/pipes/notes.pipe';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let notesService: jasmine.SpyObj<NotesService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  const mockNotes: Note[] = [
    {
      title: 'Note 1',
      note: 'Content 1',
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      isPinned: false,
      noteId: Math.random().toString(),
      userId: Math.random().toString(),
    },
    {
      title: 'Note 2',
      note: 'Content 2',
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      isPinned: false,
      noteId: Math.random().toString(),
      userId: Math.random().toString(),
    },
  ];

  beforeEach(() => {
    const notesServiceSpy = jasmine.createSpyObj('NotesService', [
      'getNotes',
      'getNote',
      'deleteNote',
    ]);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', [
      'error',
      'success',
    ]);
    const communicationServiceSpy = jasmine.createSpyObj(
      'CommunicationService',
      ['getNotes', 'updateNotes', 'searchNotes'],
      { searchTerm: of(''), getNotes: of('') }
    );

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [
        NotesComponent,
        NotesPipe,
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        { provide: NotesService, useValue: notesServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: CommunicationService, useValue: communicationServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    notesService = TestBed.inject(NotesService) as jasmine.SpyObj<NotesService>;
    toastrService = TestBed.inject(
      ToastrService
    ) as jasmine.SpyObj<ToastrService>;
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería obtener las notas al inicializar', () => {
    notesService.getNotes.and.returnValue(of(mockNotes));
    component.ngOnInit();
    expect(notesService.getNotes).toHaveBeenCalled();
    expect(component.notes).toEqual(mockNotes);
  });

  it('Debería mostrar un mensaje de error si la obtención de notas falla', () => {
    notesService.getNotes.and.returnValue(throwError(() => new Error('Error')));
    component.ngOnInit();
    expect(toastrService.error).toHaveBeenCalledWith(
      'Ocurrió un error al obtener las notas',
      'Error'
    );
  });

  it('Debería abrir los detalles de la nota', () => {
    const note = mockNotes[0];
    component.openDetails(note);
    expect(component.isDetailsVisible).toBeTrue();
    expect(component.currentNote).toEqual(note);
  });

  it('Debería abrir la opción de eliminar la nota', () => {
    const note = mockNotes[0];
    component.openDelete(note);
    expect(component.isDeleteVisible).toBeTrue();
    expect(component.currentNote).toEqual(note);
  });

  it('Debería abrir la opción de editar la nota', () => {
    const note = mockNotes[0];
    component.openEdit(note);
    expect(component.isEditVisible).toBeTrue();
    expect(component.currentNote).toEqual(note);
  });

  it('Debería cerrar los detalles de la nota', () => {
    component.closeDetails();
    expect(component.isDetailsVisible).toBeFalse();
  });

  it('No debería actualizar la nota si el resultado es falso al cerrar la edición', () => {
    component.closeEdit(false);
    expect(component.isEditVisible).toBeFalse();
  });

  it('Debería confirmar la eliminación de la nota y eliminarla', () => {
    notesService.deleteNote.and.returnValue(of(void 0));
    component.notes = mockNotes;
    component.currentNote = mockNotes[0];

    component.confirmDeletion(true);
    expect(notesService.deleteNote).toHaveBeenCalled();
    expect(component.notes.length).toBe(1);
    expect(toastrService.success).toHaveBeenCalledWith(
      'Nota eliminada correctamente',
      'Nota'
    );
  });

  it('Debería mostrar un mensaje de error si la eliminación de la nota falla', () => {
    component.currentNote = mockNotes[0];
    notesService.deleteNote.and.returnValue(
      throwError(() => new Error('Error'))
    );
    component.confirmDeletion(true);
    expect(toastrService.error).toHaveBeenCalledWith(
      'Ocurrió un error al eliminar la nota',
      'Error'
    );
  });
});
