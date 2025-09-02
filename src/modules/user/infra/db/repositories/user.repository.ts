import { Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../../../domain/dtos/repositories/User.repository';
import { EncrypterProvider } from '../../../../../shared/infra/providers/Encrypter.provider';
import { prisma } from '../../../../../shared/infra/db/prisma';
import { CreateUserBodyDTO } from '../../../domain/dtos/requests/CreateUser.request.dto';
import { HashProvider } from '../../providers/hash.provider';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  public encryptedFields: (keyof User)[] = ['name', 'email', 'password'];

  constructor(
    private readonly hashProvider: HashProvider,
    private encrypterProvider: EncrypterProvider,
  ) {}

  /* This method will find a single user using a given id */
  async findById(id: string): Promise<Partial<User> | null> {
    const user = await prisma.user.findUnique({
      where: {
        id_user: id,
      },
      select: {
        id_user: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    if (!user) {
      return null;
    }

    const decryptedUser = this.encrypterProvider.decryptData(
      user,
      this.encryptedFields as (keyof typeof user)[],
    );

    return decryptedUser;
  }

  /* This method will find a single user using a given email */
  async findByEmail(email: string): Promise<Partial<User> | null> {
    const encryptedEmail = this.encrypterProvider.encrypt({
      content: email,
    });

    const user = await prisma.user.findUnique({
      where: {
        email: encryptedEmail,
      },
      select: {
        id_user: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    if (!user) {
      return null;
    }

    const decryptedUser = this.encrypterProvider.decryptData(
      user,
      this.encryptedFields as (keyof typeof user)[],
    );

    return decryptedUser;
  }

  /* This method will set a new password for a user */
  async setPassword(
    id: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const encryptedPassword = this.encrypterProvider.encrypt({
      content: password,
    });

    const user = await prisma.user.update({
      where: {
        id_user: id,
      },
      data: {
        password: encryptedPassword,
      },
      select: {
        id_user: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    if (user) {
      const decryptedUser = this.encrypterProvider.decryptData(
        user,
        this.encryptedFields as (keyof typeof user)[],
      );

      return decryptedUser;
    }

    return null;
  }

  /* This method will create a new user */
  async create(data: CreateUserBodyDTO): Promise<User> {
    const { ...userData } = data;

    const userEncryptedData = this.encrypterProvider.encryptData(
      userData,
      this.encryptedFields as (keyof typeof userData)[],
    );

    const user = await prisma.user.create({
      data: {
        name: userEncryptedData.name,
        email: userEncryptedData.email,
        password: userEncryptedData.password,
      },
    });

    return this.encrypterProvider.decryptData(user, this.encryptedFields);
  }

  /* Method used to compare the user's password with a given password */
  async comparePassword(
    userId: string,
    givenPassword: string,
  ): Promise<boolean | null> {
    const user = await prisma.user.findUnique({
      where: {
        id_user: userId,
      },
    });

    if (!user) return null;

    const decryptedPassword = this.encrypterProvider.decrypt({
      content: user.password,
    });

    return this.hashProvider.compare(givenPassword, decryptedPassword);
  }
}
