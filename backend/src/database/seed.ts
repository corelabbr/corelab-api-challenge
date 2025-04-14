import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  let count = 0;
  const items = Array.from({ length: 10 }, () => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    favorite: count < 4? true:false,
  }), count++);

  await prisma.item.createMany({
    data: items,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
