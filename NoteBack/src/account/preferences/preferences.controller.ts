import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Request } from 'express';

import { PreferencesService } from './preferences.service';

import { Preferences } from './preferences.entity';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { CreatePreferencesDto } from './dto/create-preferences.dto';

@Controller('account/user')
@UseGuards(JwtAuthGuard)
export class PreferencesController {
  constructor(private preferencesSvc: PreferencesService) {}

  @Get('/preferences')
  async getUserPreferences(@Req() req: Request): Promise<Preferences> {
    return await this.preferencesSvc.getUserPreferences(
      req.user['id'],
      req.user['preferencesId'],
    );
  }

  @Patch('/preferences')
  async updatePreferences(
    @Req() req: Request,
    @Body() preferences: UpdatePreferencesDto,
  ): Promise<any> {
    return await this.preferencesSvc.updatePreferences(
      req.user['id'],
      req.user['preferencesId'],
      preferences,
    );
  }
}
