import Env from '@ioc:Adonis/Core/Env'
import type { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  connection: Env.get('DB_CONNECTION', 'pg') as string,
  connections: {
    pg: {
      client: 'pg',
      connection: {
        host: Env.get('PG_HOST', '127.0.0.1') as string,
        port: Number(Env.get('PG_PORT', 5432)),
        user: Env.get('PG_USER', 'postgres') as string,
        password: Env.get('PG_PASSWORD', '') as string,
        database: Env.get('PG_DB_NAME', '') as string,
      },
      migrations: { naturalSort: true },
      healthCheck: true,
      debug: (Env.get('DB_DEBUG', false) as boolean) || false,
    },
  },
}

export default databaseConfig
