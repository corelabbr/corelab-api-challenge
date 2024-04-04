const dotenv = require('dotenv');

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

module.exports = {
    connection: process.env.DB_CONNECTION || 'mysql',

    mysql: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST || '',
            port: process.env.DB_PORT || '',
            user: process.env.DB_USER || '',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || ''
        },
        debug: process.env.DB_DEBUG || false
    }

}