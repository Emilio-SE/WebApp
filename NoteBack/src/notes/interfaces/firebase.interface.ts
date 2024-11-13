import { Preferences } from 'src/account/preferences/preferences.entity';
import { Note } from '../note.entity';

export interface RawNote {
  [idNote: string]: Note;
}

export interface RawPreferences {
  [idPreferences: string]: Preferences;
}
