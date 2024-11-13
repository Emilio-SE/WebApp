import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';

import { UserService } from './user.service';
import { UserFirebaseService } from './user-firebase.service';

@Module({
  imports: [],
  providers: [UserService, UserFirebaseService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
