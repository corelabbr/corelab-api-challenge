import 'dotenv/config';

import { appConfigurations } from '../../../../config/app.config';
import { mainSeeder } from './main.seed';
import { PrismaProvider } from '../../../providers/Prisma.provider';
import { userSeeder } from './user.seed';
import { noteSeeder } from './note.seed';

const prisma = new PrismaProvider();

const seed = async () => {
  console.log('Running seed: ');

  prisma.seed([userSeeder]);
  prisma.seed([noteSeeder]);
};

const seedTest = async () => {
  console.log('Running test seed: ');
  await mainSeeder();
};

if (
  appConfigurations.NODE_ENV === 'development' ||
  appConfigurations.NODE_ENV === 'test' ||
  appConfigurations.NODE_ENV === 'local'
) {
  seed();
}

if (appConfigurations.NODE_ENV === 'local') {
  mainSeeder();
}
