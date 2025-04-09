import { assert } from 'chai'
import { test } from '@japa/runner'
import Todo from 'App/Models/Todo'

test.group('Todos', (group) => {
  group.each.setup(async () => {
    await Todo.query().delete()
  })

  test('should list todos', async ({ client }) => {
    await Todo.create({ title: 'Test A', description: 'desc', isFavorite: false, color: 'red' })

    const response = await client.get('/todos')

    response.assertStatus(200)
    response.assertBodyContains({
      meta: {},
      data: [
        {
          title: 'Test A',
        },
      ],
    })
  })

  test('should filter todos by title', async ({ client }) => {
    await Todo.create({ title: 'Important', description: 'desc', isFavorite: false, color: 'blue' })
    await Todo.create({ title: 'Other', description: 'desc', isFavorite: false, color: 'red' })

    const response = await client.get('/todos').qs({ search: 'Imp' })

    response.assertStatus(200)
    response.assertBodyContains({
      data: [
        {
          title: 'Important',
        },
      ],
    })
  })

  test('should create a todo', async ({ client }) => {
    const response = await client.post('/todos').json({
      title: 'New Todo',
      description: 'Write tests',
      isFavorite: true,
      color: 'green',
    })

    response.assertStatus(200)
    response.assertBodyContains({
      title: 'New Todo',
    })
  })

  test('should show a specific todo', async ({ client }) => {
    const todo = await Todo.create({
      title: 'Unique',
      description: 'desc',
      isFavorite: false,
      color: 'gray',
    })

    const response = await client.get(`/todos/${todo.id}`)

    response.assertStatus(200)
    response.assertBodyContains({
      id: todo.id,
      title: 'Unique',
    })
  })

  test('should update a todo', async ({ client }) => {
    const todo = await Todo.create({
      title: 'Old Title',
      description: 'desc',
      isFavorite: false,
      color: 'gray',
    })

    const response = await client.put(`/todos/${todo.id}`).json({
      title: 'Updated Title',
      description: 'Updated',
      is_favorite: true,
      color: 'purple',
    })

    response.assertStatus(200)
    response.assertBodyContains({
      title: 'Updated Title',
      is_favorite: true,
    })
  })

  test('should delete a todo', async ({ client }) => {
    const todo = await Todo.create({
      title: 'Delete Me',
      description: 'desc',
      isFavorite: false,
      color: 'black',
    })

    const response = await client.delete(`/todos/${todo.id}`)

    response.assertStatus(200)
    const check = await Todo.find(todo.id)
    assert.isNull(check)
  })
})
