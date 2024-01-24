import express from 'express';
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

const app = express();
const routes = require('./routes/route');

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);
app.use(express.urlencoded({ extended: true }));


app.listen(3333, () => {
    console.log('listening on http://localhost:3333')
});

