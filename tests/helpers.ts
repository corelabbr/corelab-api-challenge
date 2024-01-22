import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { createdUser } from './factories';
import { createSession } from './factories/sessions-factory';
import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.task.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createdUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token);

  return token;
}