import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { loadEnv } from './env.config';
import { Task } from 'modules/task/entities/Task.entity';

loadEnv();
export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.MONGO_URL,
  database: process.env.MONGO_DATABASE,
  authSource: process.env.MONGO_AUTH,
  entities: [Task],
  logging: false,
});
