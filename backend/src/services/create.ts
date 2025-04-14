import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

type ItemInput = Prisma.ItemCreateInput;

const createItem = async (data: ItemInput, db = prisma) => {
  return await db.item.create({ data });
};

export default createItem;
