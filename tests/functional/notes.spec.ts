import { test } from '@japa/runner'
import { NoteFactory } from '#database/factories/note_factory'
import { DateTime } from 'luxon'

test.group('Note API', () => {
  test('can retrieve list of notes', async ({ client, assert }) => {
    await NoteFactory.createMany(3)

    const response = await client.get('/api/notes')

    response.assertStatus(200)
    assert.isArray(response.body())
  })

  test('can create a new note', async ({ client, assert }) => {
    const note = await NoteFactory.make()
    const response = await client.post('/api/notes').json(note)

    response.assertStatus(200)
    assert.isObject(response.body())
    assert.isString(response.body().message)
  })

  test('can retrieve a note', async ({ client, assert }) => {
    const note = await NoteFactory.create()

    const response = await client.get(`/api/notes/${note.id}`)

    response.assertStatus(200)
    assert.isObject(response.body())
    assert.isString(response.body().title)
    assert.isString(response.body().body)
    assert.isString(response.body().color)
    assert.isAtLeast(response.body().favorited, 0)
    assert.isAtMost(response.body().favorited, 1)
  })

  test('can update a note', async ({ client, assert }) => {
    const note = await NoteFactory.create()
    const newNote = await NoteFactory.make()

    const response = await client.patch(`/api/notes/${note.id}`).json(newNote)

    response.assertStatus(200)
    assert.isObject(response.body())
    assert.isString(response.body().message)
  })

  test('can delete a note', async ({ client, assert }) => {
    const note = await NoteFactory.create()

    const response = await client.delete(`/api/notes/${note.id}`)

    response.assertStatus(200)
    assert.isObject(response.body())
    assert.isString(response.body().message)
  })

  test('can restore a note', async ({ client, assert }) => {
    const note = await NoteFactory.merge({ deletedAt: DateTime.now() }).create()

    const response = await client.post(`/api/notes/restore/${note.id}`)

    response.assertStatus(200)
    assert.isObject(response.body())
    assert.isString(response.body().message)
  })
})
