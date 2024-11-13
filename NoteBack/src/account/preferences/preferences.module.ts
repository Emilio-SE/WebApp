import { Module } from '@nestjs/common';
import { PreferencesController } from './preferences.controller';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';

import { PreferencesService } from './preferences.service';

@Module({
  imports: [],
  providers: [PreferencesService, JwtStrategy],
  controllers: [PreferencesController],
})
export class PreferencesModule {}
