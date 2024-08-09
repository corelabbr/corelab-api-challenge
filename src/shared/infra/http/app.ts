import express from 'express';
import 'express-async-errors'
import router from './routes';
import { loadEnv } from 'config/env.config';
import { errors } from 'celebrate';
import cors from 'cors'
import { AppError } from './errors/AppError';
import { Request, Response, NextFunction } from 'express';



loadEnv()
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errors())
app.use(express.json());

app.use((err: Error, request: Request, response: Response, next: NextFunction)=>{

  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  })

})

export default app;