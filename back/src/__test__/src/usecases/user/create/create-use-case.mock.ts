import { vi } from 'vitest';
import { faker } from '@faker-js/faker';
import { IUserRepository } from '@domain/repositories/user-repository';
import { User } from '@domain/entities/user';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export let mockUser: User;
export let mockUserRepository: IUserRepository;

export async function setupMockUser() {
  const password = faker.internet.password();
  const hash = await bcrypt.hash(password, saltRounds);

  mockUser = {
    id: Number(faker.string.uuid()),
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    passwordHash: hash,
  };

  mockUserRepository = {
    create: vi.fn().mockResolvedValue(mockUser),
    findByName: vi.fn(),
    findByEmail: vi.fn(),
    save: vi.fn(),
    findByResetToken: vi.fn(),
  };
}
