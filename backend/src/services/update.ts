import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

type ItemInput = Prisma.ItemUpdateInput;

const update = async (userId: string , data: ItemInput, db = prisma) => {  
  return await db.item.update({
    where: { id: userId },
    data,
  });
};

export default update;