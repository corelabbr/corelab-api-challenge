import { faker } from '@faker-js/faker'
import { Note, NoteProps } from '../../src/entities/note'

export function MakeNote(data?: Partial<NoteProps & { id: number }>) {
  const note = new Note(
    {
      color: data?.color ?? faker.color.rgb(),
      isFavorite: data?.isFavorite ?? false,
      description: data?.description ?? faker.lorem.lines(),
      title: data?.title ?? faker.lorem.text(),
    },
    data?.id ?? faker.number.int(),
  )

  return note
}
