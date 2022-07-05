const express = require('express')
const mongoose = require('mongoose')
const app = express()

require('dotenv').config()

const useRoutes = require('./Routes/RouteCars')

app.use(useRoutes)

console.log(process.env.URL_MONGO)

mongoose.connect(process.env.URL_MONGO)
    .then(()=> console.log('Connected'))
    .catch((err)=> console.log('Error', err))

app.listen(3000, ()=> { console.log('Server Running') })