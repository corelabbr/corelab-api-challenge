import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const findById = (userId: string, db = prisma) => {
  return db.item.findFirst({ 
    where: {
      id: userId,
      deleted: false,
    }, 
  });
};

export default findById;