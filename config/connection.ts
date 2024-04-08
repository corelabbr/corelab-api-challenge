const config = require('./database')
const mysql = require('mysql2/promise');
const mysqlConfig = config.mysql

async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection(mysqlConfig.connection);
        console.log('Connected to database!');
        return connection;
    } catch (error) {
        console.error('Error connecting to database MySQL:', error.message);
        throw error;
    }
}

module.exports = connectToDatabase()