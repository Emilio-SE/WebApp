import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../interfaces/note.interface';

@Pipe({
  name: 'notesPipe'
})
export class NotesPipe implements PipeTransform {

  transform(items: Note[], searchTerm: string): Note[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();
    return items.filter(item => {
      return item.title.toLowerCase().includes(searchTerm)
    });
  }

}
