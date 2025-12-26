import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: `${process.env.DB_HOST || 'localhost'}`,
  port: `${process.env.DB_PORT || 5432}`,
  username: `${process.env.DB_USERNAME || 'admin'}`,
  password: `${process.env.DB_PASSWORD || 'admin'}`,
  database: `${process.env.DB_NAME || 'corelab'}`,
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
