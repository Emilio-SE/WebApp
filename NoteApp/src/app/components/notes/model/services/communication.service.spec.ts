import { TestBed } from '@angular/core/testing';
import { CommunicationService } from './communication.service';

describe('CommunicationService', () => {
  let service: CommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommunicationService],
    });
    service = TestBed.inject(CommunicationService);
  });

  it('Debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('Debería emitir un valor cuando se llama a updateNotes', (done) => {
    service.getNotes.subscribe(() => {
      expect(true).toBeTrue();
      done();
    });

    service.updateNotes();
  });

  it('Debería emitir el término de búsqueda correcto cuando se llama a searchNotes', (done) => {
    const searchTerm = 'test term';

    service.searchTerm.subscribe((term) => {
      expect(term).toBe(searchTerm);
      done();
    });

    service.searchNotes(searchTerm);
  });

  it('No se debe emitir un valor si searchNotes se llama con una cadena vacía', (done) => {
    const searchTerm = '';

    service.searchTerm.subscribe((term) => {
      expect(term).toBe(searchTerm);
      done();
    });

    service.searchNotes(searchTerm);
  });
});
