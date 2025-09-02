import { Note } from '../../entities/note'

export class NotesPresenter {
  static toHTTP(data: Note) {
    const note = {
      id: data.id!,
      description: data.description,
      title: data.title,
      color: data.color,
      isFavorite: data.isFavorite,
    }

    return note
  }

  static manyToHttp(data: Note[]) {
    return data.map((attempt) => NotesPresenter.toHTTP(attempt))
  }
}
