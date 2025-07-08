/**
 * FILE DESIGNED TO BE USED BY TYPEORM
 */
import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';

// Loads .env variables
dotenv.config();

const databaseConfig = (): DataSourceOptions => ({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ["./src/**/entities/*.ts"],
  migrations: ["./migrations/*.ts"],
})

export const AppDataSource = new DataSource(databaseConfig())

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })