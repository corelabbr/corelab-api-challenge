import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'klayton.dias@gmail.com';

  const existingUser = await prisma.usuario.findUnique({ where: { email } });

  if (!existingUser) {
    await prisma.usuario.create({
      data: {
        nome: 'Klayton Dias',
        email,
        passwordHash: '$2b$10$qXkD1RPzs7X3lUQrzO3IpexDP/DtuPTketQ9W1YuHaDxgKohr6NlC'
      },
    });
  } 
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
