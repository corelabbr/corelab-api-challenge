import { test } from '@japa/runner'
const baseUrl = "http://localhost:3333";

test.group('unit tests', () => {
  test('welcome', async ({ client }) => {
    const response = await client.get(`${baseUrl}`)
    response.assertStatus(200)
  })

  test('get all tasks', async ({ client }) => {
    const response = await client.get(`${baseUrl}/tasks`)

    response.assertStatus(200)
    response.assertBodyContains({ message: "Tasks encontadas!", data: Array<Task>() });
  });

})
