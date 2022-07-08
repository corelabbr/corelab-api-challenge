import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import vehiculeRoute from './routes/vehiculeRoute';

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use(vehiculeRoute);

app.listen(process.env.PORT);
