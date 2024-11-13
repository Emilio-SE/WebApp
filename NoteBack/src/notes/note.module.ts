import { Module } from '@nestjs/common';
import { PreferencesController } from './note.controller';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { NotesService } from './note.service';

@Module({
  imports: [],
  providers: [NotesService, JwtStrategy],
  controllers: [PreferencesController],
})
export class NoteModule {}
