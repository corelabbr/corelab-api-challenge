import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfigurations } from '../shared/config/app.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        type: appConfigurations.DB_ENGINE as any,
        host: appConfigurations.DB_HOST,
        port: appConfigurations.DB_PORT,
        username: appConfigurations.DB_USER,
        password: appConfigurations.DB_PASSWORD,
        database: appConfigurations.DB_DATABASE,
        entities: [appConfigurations.DB_ENTITIES],
        synchronize: appConfigurations.DB_SYNCHRONIZE,
        logging: appConfigurations.DB_LOGGING,
        logger: 'advanced-console',
        ssl: appConfigurations.SSL,
      }),
    }),
  ],
})
export class DatabaseModule {}
