const env = require('dotenv')
env.config()

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: {
      rejectUnauthorized: false,
      require: true,
    },
  },
})

module.exports = knex
