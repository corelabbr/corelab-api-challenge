import express from 'express';

const app = express();
const routes = require('./routes/route');

app.use(express.json());
app.use(routes);
app.use(express.urlencoded({ extended: true }));


app.listen(3333, () => {
    console.log('listening on http://localhost:3333')
});

