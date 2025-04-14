import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const deleteItem = async (userId: string, db = prisma) => {  
  return await db.item.update({
    where: { id: userId },
    data: {
      deleted: true,
      deletedAt: new Date(),
    },
  });
};

export default deleteItem;