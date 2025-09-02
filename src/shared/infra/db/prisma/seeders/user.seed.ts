import { PrismaClient } from '@prisma/client';
import { EncrypterProvider } from '../../../providers/Encrypter.provider';
import { HashProvider } from '../../../../../modules/user/infra/providers/hash.provider';

export const userSeeder = async (prisma: PrismaClient) => {
  console.log('Running Users seeder...');

  const encrypterProvider = new EncrypterProvider();
  const hashProvider = new HashProvider();

  const userEmail = 'usuario_corenotes@gmail.com';
  const enc = encrypterProvider.encrypt({
    content: userEmail,
  });

  const existingUser = await prisma.user.findFirst({
    where: {
      email: enc,
    },
  });

  if (existingUser) return;

  await prisma.user.create({
    data: {
      name: encrypterProvider.encrypt({
        content: 'Usuário da CoreNotes',
      }),
      email: enc,
      password: encrypterProvider.encrypt({
        content: await hashProvider.hash('senha123'),
      }),
    },
  });

  console.log('Users seeder completed.');
};
