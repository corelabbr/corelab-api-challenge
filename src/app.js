import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import vehiculeAdRoute from './routes/vehiculeAdRoute.js';

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use('/vehicule', vehiculeAdRoute);

app.listen(process.env.PORT);
