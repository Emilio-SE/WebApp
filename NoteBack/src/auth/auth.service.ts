import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { DataSnapshot, get, push, ref } from 'firebase/database';
import { db } from 'src/common/config/firebase.config';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

import { User } from 'src/account/user/user.entity';

import { JwtPayload, LoginAuth } from './interfaces/auth.interface';
import { Preferences } from 'src/account/preferences/preferences.entity';

@Injectable()
export class AuthService {
  private dbRef = ref(db, 'users');
  private preferencesRef = ref(db, 'preferences');

  constructor(private jwtSvc: JwtService) {}

  public async create(user: CreateUserDto): Promise<any> {
    const { password, email } = user;

    const snapshot: DataSnapshot = await get(this.dbRef);
    const users: any = snapshot.val();

    if (users) {
      const findUser = Object.values(users).find((u: any) => u.email === email);

      if (findUser)
        throw new HttpException(
          'El correo electrónico ya está registrado',
          HttpStatus.BAD_REQUEST,
        );
    }

    const hashedPassword: string = await hash(password, 10);

    user.password = hashedPassword;

    const newElement = push(this.dbRef, {
      ...user,
      createdAt: new Date().toISOString(),
    });

    const newPreferences = {
      userId: newElement.key,
      theme: 'light-theme',
    };

    push(this.preferencesRef, newPreferences);

    return newElement;
  }

  public async login(user: LoginDto): Promise<LoginAuth> {
    const { password, email } = user;

    const snapshot: DataSnapshot = await get(this.dbRef);
    const users: any = snapshot.val();

    if (!users) {
      throw new HttpException(
        'Correo o contraseña incorrectos',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findUser = Object.values(users).find(
      (u: any) => u.email === email,
    ) as User;

    const userId = Object.keys(users).find(
      (k: any) => users[k].email === email,
    );

    if (!findUser)
      throw new HttpException(
        'Correo o contraseña incorrectos',
        HttpStatus.BAD_REQUEST,
      );

    const validPassword: boolean = await compare(password, findUser.password);

    if (!validPassword)
      throw new HttpException(
        'Correo o contraseña incorrectos',
        HttpStatus.BAD_REQUEST,
      );

    const snapshotPreferences: DataSnapshot = await get(this.preferencesRef);
    const preferences: any = snapshotPreferences.val();

    const preferenceId = Object.keys(preferences).find(
      (prefId: string) => preferences[prefId].userId === userId,
    );

    const payload: JwtPayload = {
      id: userId,
      email: findUser.email,
      preferencesId: preferenceId,
    };

    const token: string = this.jwtSvc.sign(payload);

    return {
      token,
    };
  }
}
