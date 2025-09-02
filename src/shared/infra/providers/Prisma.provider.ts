import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { appConfigurations, Environment } from '../../config/app.config';

@Injectable()
export class PrismaProvider
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private environment: Environment = appConfigurations.NODE_ENV) {
    let datasourceUrl = appConfigurations.DATABASE_URL;
    if (environment === Environment.TEST) {
      datasourceUrl = appConfigurations.SHADOW_DATABASE_URL as string;
    }
    super({
      datasourceUrl,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async seed(seeders: ((prisma: PrismaClient) => Promise<void>)[]) {
    if (this.environment === Environment.PRODUCTION) {
      throw new Error('This method is not allowed in production enviroment');
    }

    for (const seeder of seeders) {
      await seeder(this);
    }
  }

  async clear(models: string[] | 'all') {
    if (this.environment === Environment.PRODUCTION) {
      throw new Error('This method is not allowed in production enviroment');
    }

    const allModels = ['users'];

    const modelsToClear = models === 'all' ? allModels : models;

    for (const model of modelsToClear) {
      await this.$queryRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`);
      await this.$executeRawUnsafe(`TRUNCATE TABLE \`${model}\`;`);
      await this.$queryRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1;`);
    }
  }
}
