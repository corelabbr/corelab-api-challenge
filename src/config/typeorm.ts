import 'reflect-metadata';
import { DataSource } from "typeorm";
import { loadEnv } from './env.config';
import { Task } from 'modules/task/entities/Task.entity';

loadEnv()
export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
  database: `${process.env.MONGO_DATABASE}`,
  authSource: `${process.env.MONGO_USER}`,
  entities: [Task],
  logging: false,
  directConnection: true,
});