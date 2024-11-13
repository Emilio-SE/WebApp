import { HttpException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { DeleteUserDataDto } from './dto/delete-user.dto';

import { User } from './user.entity';

import { UserDataAccount } from './interfaces/user.interface';
import { DataSnapshot, get, ref, remove } from 'firebase/database';
import { db } from 'src/common/config/firebase.config';

@Injectable()
export class UserFirebaseService {

  private dbRef = ref(db, 'users');

  constructor() {}

  public async findUser(email: string): Promise<UserDataAccount> {

    const snapshot: DataSnapshot = await get(this.dbRef);
    const users: any = snapshot.val();

    const userData = Object.values(users).find(
      (u: User) => u.email === email,
    ) as User;

    const id = Object.keys(users).find((u: any) => u.email === email);

    return {
      id: id,
      name: userData.name,
      email: userData.email,
    } as UserDataAccount;
  }

  public async deleteAccount(
    email: string,
    password: DeleteUserDataDto,
  ): Promise<any> {
    const dbRef = ref(db, 'users');

    const snapshot: DataSnapshot = await get(dbRef);
    const users: any = snapshot.val();

    const userData = Object.values(users).find(
      (u: any) => u.email === email,
    ) as User;

    const isPasswordMatching: boolean = await compare(
      password.password,
      userData.password,
    );

    if (!isPasswordMatching)
      throw new HttpException(
        'La contraseña no coincide',
        400,
      );

    const id = Object.keys(users).find((u: any) => u.email === email);

    const userRef = ref(db, `users/${id}`);
    return await remove(userRef);
  }
}
