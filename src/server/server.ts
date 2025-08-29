import express from 'express';
import { router } from './routes/taskRoutes';

const server = express();
server.use(express.json());
server.use(router);



export { server };