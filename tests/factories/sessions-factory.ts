import { Session } from '@prisma/client';
import { createdUser } from './users-factories';
import { prisma } from '@/config';

export async function createSession(token: string): Promise<Session> {
  const user = await createdUser();

  return prisma.session.create({
    data: {
      token: token,
      userId: user.id,
    },
  });
}