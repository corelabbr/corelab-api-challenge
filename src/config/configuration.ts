import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Task } from "src/tasks/entities/task.entity";

export const databaseConfig = () => {
  const config: TypeOrmModuleOptions =
  {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [Task],
    synchronize: false,
    autoLoadEntities: true,
  }
  return config;
}