import { PrismaClient } from '@prisma/client';
import { EncrypterProvider } from '../../../providers/Encrypter.provider';

export const noteSeeder = async (prisma: PrismaClient) => {
  console.log('Running Notes seeder...');

  const encrypterProvider = new EncrypterProvider();

  const userEmail = 'usuario_corenotes@gmail.com';
  const enc = encrypterProvider.encrypt({ content: userEmail });

  const existingUser = await prisma.user.findFirst({
    where: {
      email: enc,
    },
  });

  if (!existingUser) {
    console.log('No user found, skipping notes seeder.');
    return;
  }

  await prisma.note.createMany({
    data: [
      {
        note_title: encrypterProvider.encrypt({ content: 'Shopping list' }),
        note_text: encrypterProvider.encrypt({ content: `
          • Milk\n
          • Eggs\n
          • Bread` 
        }),
        user_id: existingUser.id_user,
        starred: true,
        note_color: 'yellow',
      },
      {
        note_title: encrypterProvider.encrypt({ content: 'Meeting notes' }),
        note_text: encrypterProvider.encrypt({ content: '' }),
        user_id: existingUser.id_user,
        starred: true,
        note_color: 'blue',
      },
      {
        note_title: encrypterProvider.encrypt({ content: 'Project ideas' }),
        note_text: encrypterProvider.encrypt({ content: 'Launch new website' }),
        user_id: existingUser.id_user,
        starred: false,
        note_color: 'red',
      },
      {
        note_title: encrypterProvider.encrypt({ content: 'Vacation plans' }),
        note_text: encrypterProvider.encrypt({ content: 'Visit Rome in June' }),
        user_id: existingUser.id_user,
        starred: false,
        note_color: 'red',
      },
    ],
  });

  console.log('Notes seeder completed.');
};
