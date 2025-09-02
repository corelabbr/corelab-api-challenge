import { PrismaProvider } from '../../../providers/Prisma.provider';

const prisma = new PrismaProvider();

export const mainSeeder = async () => {
  console.log('Running main seeder...');
};
