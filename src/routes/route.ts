import express from 'express'

const TaskRoot = require('./task.routes')
const routes = express()

routes.use('/task', TaskRoot)

module.exports = routes
