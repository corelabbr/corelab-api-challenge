import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function resetDatabase() {
  const db = await open({
    filename: './database/database.sqlite',
    driver: sqlite3.Database,
  })

  await db.exec('DROP TABLE IF EXISTS tasks')
  await db.exec(`
    CREATE TABLE tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      is_favorite INTEGER DEFAULT 0,
      color TEXT DEFAULT '#ffffff',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `)
  await db.close()
  console.log('Banco de dados resetado com sucesso.')
}

resetDatabase().catch((err) => {
  console.error('Erro ao resetar banco:', err)
  process.exit(1)
})