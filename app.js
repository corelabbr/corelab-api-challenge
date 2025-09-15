require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { db } = require('./config/db');
const Task = require('./models/task');

const router = require('./routes/router');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());

// synchronizing database
const syncDB = async () => {
    try {
        await db.sync();
    } catch (error) {
        console.log(error);
    }

};
syncDB();

app.use('/api', router);

// start server
app.listen(port, () => {
    console.log('Server running.');
});