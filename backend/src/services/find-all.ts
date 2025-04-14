import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

interface IParams {
  name?: string;
  db?: PrismaClient;
  color?: string;
  search?: string;
}

const findAll = ({ name, color, search, db = prisma }: IParams) => {
  const filters: Prisma.ItemWhereInput[] = [];

  if (search) {
    filters.push({
      OR: [
        { 
          name: { 
            contains: search, 
            mode: 'insensitive' as Prisma.QueryMode 
          } 
        },
        { 
          color: { 
            contains: search, 
            mode: 'insensitive' as Prisma.QueryMode 
          } 
        }
      ]
    });
  } else {
    if (name) {
      filters.push({
        name: {
          contains: name,
          mode: 'insensitive' as Prisma.QueryMode,
        },
      });
    }

    if (color) {
      filters.push({
        color: {
          contains: color,
          mode: 'insensitive' as Prisma.QueryMode,
        },
      });
    }
  }

  return db.item.findMany({
    where: {
      deleted: false,
      ...(filters.length > 0 ? (filters.length > 1 ? { AND: filters } : filters[0]) : {}),
    },
    orderBy: [
      { favorite: 'desc' },
      { createdAt: 'desc' },
    ],
  });
};

export default findAll;