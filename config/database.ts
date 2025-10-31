/*
|--------------------------------------------------------------------------
| Database Configuration
|--------------------------------------------------------------------------
|
| Configure your database connection here. This file uses SQLite.
|
*/


const databaseConfig = {
  connection: 'sqlite',
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: './database/database.sqlite',
    },
    useNullAsDefault: true,
    migrations: {
      naturalSort: true,
    },
    healthCheck: false,
    debug: false,
  },
}

export default databaseConfig

