import { IUser } from '@domain/interfaces/user.interface';

export class User implements IUser {
  id?: number;
  name: string;
  username: string;
  password: string;
  createdAt: Date;

  constructor(user: IUser) {
    Object.assign(this, user);

    if (!user?.id) {
      this.createdAt = new Date();
    }
  }
}
