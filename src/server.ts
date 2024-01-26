import express from 'express';
import cors from 'cors';
import { router } from './routers/router';

const app = express();
const port = process.env.Port || 5080;
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());
//app.use(cors());
app.use(router);
app.listen(port, async () =>
    console.log(`Aplicação iniciada na porta ${port}!`)
);
