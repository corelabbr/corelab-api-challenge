import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

export function loadEnv(): void {
  let path: string;

  switch (process.env.NODE_ENV) {
    case 'test':
      path = '.env.test';
      break;

    case 'dev':
      path = '.env.dev';
      break;

    default:
      return;
  }

  const currentEvents = dotenv.config({ path });

  if (currentEvents.error) throw new Error(`failed to load env from ${path}: ${currentEvents.error}`);

  dotenvExpand.expand(currentEvents);
}
