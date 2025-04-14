import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const favoriteItem = async (userId: string, favorite: boolean, db = prisma) => {  
  return await db.item.update({
    where: { id: userId },
    data: { favorite },
  });
};

export default favoriteItem;