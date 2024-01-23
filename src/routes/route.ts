import express from 'express';

const TaskRoot = require('./task/route')
const routes = express();

routes.use('/task', TaskRoot);

module.exports = routes;