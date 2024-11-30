import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageNoteComponent } from './manage-note.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NotesService } from '../../../model/services/notes.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Note } from '../../../model/interfaces/note.interface';

describe('ManageNoteComponent', () => {
  let component: ManageNoteComponent;
  let fixture: ComponentFixture<ManageNoteComponent>;
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

  beforeEach(async () => {
    const notesServiceSpy = jasmine.createSpyObj('NotesService', [
      'getNotes',
      'getNote',
      'deleteNote',
      'createNote',
      'updateNote',
    ]);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', [
      'error',
      'success',
      'warning',
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ManageNoteComponent],
      providers: [
        FormBuilder,
        { provide: NotesService, useValue: notesServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageNoteComponent);
    component = fixture.componentInstance;
    notesService = TestBed.inject(NotesService) as jasmine.SpyObj<NotesService>;
    toastrService = TestBed.inject(
      ToastrService
    ) as jasmine.SpyObj<ToastrService>;
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería llamar a getNote si se proporciona noteId', () => {
    notesService.getNote.and.returnValue(of(mockNotes[0]));
    component.noteId = '123';
    component.ngOnInit();
    expect(notesService.getNote).toHaveBeenCalledWith('123');
  });

  it('Debería actualizar el formulario con los datos de la nota cuando se llama a getNote', () => {
    component.noteId = '123';
    notesService.getNote.and.returnValue(of(mockNotes[0]));
    component.ngOnInit();
    expect(component.form.controls['title'].value).toBe(mockNotes[0].title);
    expect(component.form.controls['note'].value).toBe(mockNotes[0].note);
  });

  it('Debería crear una nota si el formulario es válido y no se proporciona noteId', () => {
    notesService.createNote.and.returnValue(of(mockNotes[0]));
    component.form.setValue({
      title: mockNotes[0].title,
      note: mockNotes[0].note,
    });
    component.saveNote();
    expect(notesService.createNote).toHaveBeenCalledWith({
      title: mockNotes[0].title,
      note: mockNotes[0].note,
    });
    expect(toastrService.success).toHaveBeenCalledWith(
      'Nota creada correctamente',
      'Nota'
    );
  });

  it('Debería mostrar una advertencia si el formulario no es válido en saveNote', () => {
    component.form.setValue({ title: '', note: '' });
    component.saveNote();
    expect(toastrService.warning).toHaveBeenCalledWith(
      'Todos los campos son requeridos',
      'Advertencia'
    );
  });

  it('Debería llamar a updateNote si se proporciona noteId y el formulario es válido', () => {
    const responseNote = mockNotes[0];
    const updatedNote = { title: 'Updated Note', note: 'Updated Content' };
    responseNote.title = updatedNote.title;
    responseNote.note = updatedNote.note;

    notesService.updateNote.and.returnValue(of(responseNote));
    component.noteId = '123';
    component.form.setValue(updatedNote);

    component.saveNote();
    expect(notesService.updateNote).toHaveBeenCalledWith(updatedNote, '123');
    expect(toastrService.success).toHaveBeenCalledWith(
      'Nota actualizada correctamente',
      'Nota'
    );
  });

  it('Debería mostrar un mensaje de error si updateNote falla', () => {
    
    const newNote = { title: 'New Note', note: 'Note content' };

    notesService.createNote.and.returnValue(
      throwError(() => new Error('Error'))
    );
    
    component.form.setValue(newNote);
    component.saveNote();
    expect(toastrService.error).toHaveBeenCalledWith(
      'Ocurrió un error al crear la nota',
      'Error'
    );
  });

});
