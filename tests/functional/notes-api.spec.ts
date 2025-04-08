import { test } from '@japa/runner'

test('display notes', async ({ client }) => {
  const response = await client.get('/notes')

  response.assertStatus(200)
  response.assertBodyContains([
    {
      id: 1,
      name: 'First Vehicle',
      description: 'This is a description of first vehicle',
      plate: 'DDT-0012',
      isFavorite: false,
      year: 2018,
      color: '#ff00ff',
      price: 22000,
    },
  ])
})
