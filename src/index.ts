import { server } from './server/server';
import dotenv from 'dotenv';

dotenv.config();

const port = Number(process.env.PORT) || 3000;


server.listen(port, () => {
    console.log(`Projeto rodando localhost ${port}`);
});
