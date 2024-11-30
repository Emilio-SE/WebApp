import { NotesPipe } from './notes.pipe'; // Ajusta la importación según la ubicación del archivo
import { Note } from '../interfaces/note.interface';

describe('NotesPipe', () => {
  let pipe: NotesPipe;
  const notes: Note[] = [
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
    pipe = new NotesPipe();
  });

  it('Debería crear el pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('Debería retornar el mismo arreglo cuando no se proporciona searchTerm', () => {
    const result = pipe.transform(notes, '');
    expect(result).toEqual(notes);
  });

  it('Debería retornar el mismo arreglo cuando el arreglo está vacío', () => {
    const result = pipe.transform([], 'Note');
    expect(result).toEqual([]);
  });

  it('Debería filtrar las notas basadas en el searchTerm', () => {
    const result = pipe.transform(notes, 'Note');
    expect(result.length).toBe(3);
  });

  it('Debería retornar un arreglo vacío cuando no hay notas que coincidan con el searchTerm', () => {
    const result = pipe.transform(notes, 'Nonexistent');
    expect(result.length).toBe(0);
  });

  it('Debería manejar la insensibilidad de mayúsculas y minúsculas en searchTerm', () => {
    const result = pipe.transform(notes, 'note');
    expect(result.length).toBe(3); 
  });

});
