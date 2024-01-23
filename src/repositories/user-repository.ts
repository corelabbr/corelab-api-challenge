import { Prisma } from '@prisma/client'
import { prisma } from '@/config'

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  }

  if (select) {
    params.select = select
  }

  return prisma.user.findUnique(params)
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  })
}

export const userRepository = {
  findByEmail,
  create,
}
