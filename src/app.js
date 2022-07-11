import dotenv from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import vehiculeAdRoute from './routes/vehiculeAdRoute.js';
import demoUsers from './middlewares/demoUsersMiddleware.js';

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

demoUsers();
app.use('/vehicule', vehiculeAdRoute);

app.listen(process.env.PORT, () => {
  console.log("server is running port " + process.env.PORT )
});
