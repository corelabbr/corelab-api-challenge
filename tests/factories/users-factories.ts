import { PrismaClient, User } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

interface FakeUser {
  name: string;
  email: string;
  password: string;
}

interface UserParams {
  name?: string;
  email?: string;
  password?: string;
}

export async function createdUser(params?: UserParams): Promise<User> {
  const fakeUser: UserParams = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...params,
  };

  const prismaUser = await prisma.user.create({
    data: {
      name: fakeUser.name,
      email: fakeUser.email,
      password: fakeUser.password,
    },
  });

  return prismaUser;
}

export function createRequestBody(): { name: string; email: string; password: string } {
  const fakeUser: FakeUser = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return {
    name: fakeUser.name,
    email: fakeUser.email,
    password: fakeUser.password,
  };
}

export function createUserParams(name: string, email: string, password: string) {
    return {
        name: name,
        email: email,
        password: password
    }
}