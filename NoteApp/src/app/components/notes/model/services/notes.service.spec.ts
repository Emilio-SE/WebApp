import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { NotesService } from './notes.service';
import { environment } from '../../../../../../environments/environment';
import { CreateNote, Note, UpdateNote } from '../interfaces/note.interface';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('NotesService', () => {
  let service: NotesService;
  let httpMock: HttpTestingController;
  const mockNote: Note = {
    title: 'Note 1',
    note: 'Content 1',
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
    isPinned: false,
    noteId: Math.random().toString(),
    userId: Math.random().toString(),
  };
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
    {
      title: 'Another Note',
      note: 'Content 3',
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      isPinned: false,
      noteId: Math.random().toString(),
      userId: Math.random().toString(),
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        NotesService,
      ],
    });

    service = TestBed.inject(NotesService); 
    httpMock = TestBed.inject(HttpTestingController); 
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('Debería crear el servicio', () => {
    expect(service).toBeTruthy(); 
  });

  it('Debería llamar al API y retornar todas las notas', () => {
    service.getNotes().subscribe((notes) => {
      expect(notes.length).toBe(3);
      expect(notes).toEqual(mockNotes); 
    });

    const req = httpMock.expectOne(environment.notes); 
    expect(req.request.method).toBe('GET'); 
    req.flush(mockNotes); 
  });

  it('Debería obtener una sola nota por id', () => {
    const noteId = '1';

    service.getNote(noteId).subscribe((note) => {
      expect(note).toEqual(mockNote);
    });

    const req = httpMock.expectOne(`${environment.notes}/${noteId}`);
    expect(req.request.method).toBe('GET'); 
    req.flush(mockNote); 
  });

  it('Debería actualizar una nota', () => {
    const mockUpdateNote: UpdateNote = {
      title: 'Updated Note',
      note: 'Updated Content',
    };
    const noteId = '1';

    service.updateNote(mockUpdateNote, noteId).subscribe((response) => {
      expect(response).toEqual(mockUpdateNote); 
    });

    const req = httpMock.expectOne(`${environment.notes}/${noteId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(mockUpdateNote); 
    req.flush(mockUpdateNote);
  });

  it('Debería crear una nota', () => {
    const mockCreateNote: CreateNote = {
      title: 'New Note',
      note: 'New Content',
    };

    service.createNote(mockCreateNote).subscribe((response) => {
      expect(response).toEqual(mockCreateNote);
    });

    const req = httpMock.expectOne(environment.notes);
    expect(req.request.method).toBe('POST'); 
    expect(req.request.body).toEqual(mockCreateNote); 
    req.flush(mockCreateNote); 
  });

  it('Debería eliminar una nota', () => {
    const noteId = '1';

    service.deleteNote(noteId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${environment.notes}/${noteId}`); 
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
