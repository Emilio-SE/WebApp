import { HttpException, Injectable } from '@nestjs/common';

import { Preferences } from './preferences.entity';

import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { CreatePreferencesDto } from './dto/create-preferences.dto';
import { DataSnapshot, get, push, ref, set } from 'firebase/database';
import { db } from 'src/common/config/firebase.config';
import { RawPreferences } from 'src/notes/interfaces/firebase.interface';

@Injectable()
export class PreferencesService {
  private dbRef = ref(db, 'preferences');

  constructor() {}

  public async getUserPreferences(userId: string, preferenceId): Promise<any> {
    const snapshot: DataSnapshot = await get(this.dbRef);
    const preferences: RawPreferences | undefined = snapshot.val();

    if (!preferences) {
      throw new HttpException('Preferencias no encontradas', 404);
    }

    const userPreferences = preferences[preferenceId];

    if (!userPreferences || userPreferences.userId !== userId) {
      throw new HttpException('Preferencias no encontradas', 404);
    }

    return userPreferences;
  }

  public async updatePreferences(
    userId: string,
    preferenceId: string,
    preferences: UpdatePreferencesDto,
  ): Promise<any> {
    const snapshot: DataSnapshot = await get(this.dbRef);
    const preferencesData: RawPreferences = snapshot.val();

    const userPreferences = preferencesData[preferenceId];

    if (!userPreferences || userPreferences.userId !== userId) {
      throw new HttpException('Preferencias no encontradas', 404);
    }

    userPreferences.theme = preferences.theme;

    await set(ref(db, `preferences/${preferenceId}`), userPreferences);

    return userPreferences;
  }
}
