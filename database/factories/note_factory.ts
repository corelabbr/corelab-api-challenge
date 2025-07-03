import factory from '@adonisjs/lucid/factories'
import Note from '#models/note'

export const NoteFactory = factory
  .define(Note, async ({ faker }) => {
    return {
      title: faker.lorem.words(),
      body: faker.lorem.paragraph(),
      color: faker.color.human(),
      favorited: faker.datatype.boolean(),
    }
  })
  .build()
