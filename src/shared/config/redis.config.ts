import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { appConfigurations } from './app.config';
import Keyv from 'keyv';
import { CacheableMemory } from 'cacheable';
import { createKeyv } from '@keyv/redis';

export const RedisOptions: CacheModuleAsyncOptions = {
  imports: [ConfigModule],
  isGlobal: true,
  useFactory: async () => {
    return {
      stores: [
        new Keyv({
          store: new CacheableMemory(),
        }),
        createKeyv(
          appConfigurations.NODE_ENV === 'production'
            ? `redis://${appConfigurations.REDIS_PRODUCTION_USER}:${appConfigurations.REDIS_PRODUCTION_PASSWORD}@${appConfigurations.REDIS_PRODUCTION_HOST}:${appConfigurations.REDIS_PRODUCTION_PORT}`
            : `redis://${appConfigurations.REDIS_HOST}:${appConfigurations.REDIS_PORT}`,
        ),
      ],
    };
  },
};
