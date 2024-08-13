import { Sequelize } from 'sequelize'

import dotenv from 'dotenv'

dotenv.config()
const DB_NAME = process.env.DB_DATABASE as string
const DB_HOST = process.env.DB_HOST
const DB_USERNAME = process.env.DB_USERNAME as string
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DIALECT = 'mysql'

const sequelizeConnection = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
})

export default sequelizeConnection
