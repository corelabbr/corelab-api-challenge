const express = require('express')
const app = express()

const useRoutes = require('./Routes')

app.use(useRoutes)

app.listen(3000, ()=> { console.log('Server Running') })