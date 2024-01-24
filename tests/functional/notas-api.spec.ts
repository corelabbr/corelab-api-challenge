/* eslint-disable prettier/prettier */
import { test } from '@japa/runner'

test('display notes', async ({ client }) => {
  const response = await client.get('/notes')

  response.assertStatus(200)
  response.assertBodyContains([
    {
      id: 1,
      title: 'First note',
      description: 'This is a description of first note',
      favorite: false,
      color: '#FFFFFF',
    },
  ])
})
