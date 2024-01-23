import { prisma } from '@/config'

type SessionUncheckedCreateInput = {
  token: string
  userId: number
}

async function createSession(data: SessionUncheckedCreateInput) {
  return prisma.session.create({
    data,
  })
}

async function findSession(token: string) {
  return prisma.session.findFirst({
    where: {
      token,
    },
  })
}

export const authenticationRepository = {
  createSession,
  findSession,
}
