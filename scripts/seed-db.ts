import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function seedDatabase() {
  const db = await open({
    filename: './database/database.sqlite',
    driver: sqlite3.Database,
  })

  const now = new Date().toISOString()
  const tasks = [
    {
      title: '⭐ Exemplo de tarefa favorita',
      description: 'Esta tarefa serve como demonstração e está marcada como favorita.',
      is_favorite: 1,
      color: 'color1',
      created_at: now,
      updated_at: now,
    },
    {
      title: 'Levar cachorro ao veterinário',
      description: 'Consulta anual de rotina para vacinas e check-up.',
      is_favorite: 1,
      color: 'color2',
      created_at: now,
      updated_at: now,
    },
    {
      title: 'Comprar mantimentos',
      description: 'Lista: arroz, feijão, leite, ovos, pão.',
      is_favorite: 0,
      color: 'color3',
      created_at: now,
      updated_at: now,
    },
    {
      title: 'Estudar para prova de matemática',
      description: 'Revisar capítulos 4 e 5, resolver exercícios.',
      is_favorite: 0,
      color: 'color4',
      created_at: now,
      updated_at: now,
    },
    {
      title: 'Enviar relatório mensal',
      description: 'Preparar e enviar relatório de desempenho até sexta-feira.',
      is_favorite: 1,
      color: 'color5',
      created_at: now,
      updated_at: now,
    },
    {
      title: 'Limpar a casa',
      description: 'Focar na cozinha e banheiro.',
      is_favorite: 0,
      color: '#FFF',
      created_at: now,
      updated_at: now,
    },
  ]

  for (const task of tasks) {
    await db.run(
      `INSERT INTO tasks (title, description, is_favorite, color, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      task.title,
      task.description,
      task.is_favorite,
      task.color,
      task.created_at,
      task.updated_at
    )
  }

  await db.close()
  console.log('Banco populado com tarefas de demonstração.')
}

seedDatabase().catch((err) => {
  console.error('Erro ao popular banco:', err)
  process.exit(1)
})