import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './account/user/user.module';
import { PreferencesModule } from './account/preferences/preferences.module';
import { NoteModule } from './notes/note.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    PreferencesModule,
    NoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
