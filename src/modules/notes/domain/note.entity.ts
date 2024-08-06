import { createNoteDTO } from './dtos/createNoteDTO'
import { updateNoteDTO } from './dtos/updateNoteDTO'

type noteProps<T = string> = {
  id: T
  title: string
  content: string
  isFavorite: boolean
  createdAt: Date
  updatedAt: Date
  fileUrl?: string
  color?: string
}

export class Note<T> {
  private readonly props: noteProps<T>
  constructor(props: noteProps<T>) {
    this.props = props
  }

  update(props: updateNoteDTO) {
    this.props.title = props.title || this.props.title
    this.props.content = props.content || this.props.content
    this.props.isFavorite = props.isFavorite || this.props.isFavorite
    this.props.fileUrl = props.fileUrl || this.props.fileUrl
    this.props.color = props.color || this.props.color
    this.props.updatedAt = new Date()
  }

  static create(props: createNoteDTO): Note<null> {
    const note = new Note({
      id: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      content: props.content,
      title: props.title,
      isFavorite: props.isFavorite,
    })

    return note
  }

  static buildFromProps(props: noteProps<string>): Note<string> {
    return new Note(props)
  }

  get id() {
    return this.props.id
  }
  set id(id: T) {
    this.props.id = id
  }

  get title() {
    return this.props.title
  }
  set title(title: string) {
    this.props.title = title
  }

  get content() {
    return this.props.content
  }
  set content(content: string) {
    this.props.content = content
  }

  get isFavorite() {
    return this.props.isFavorite
  }
  set isFavorite(isFavorite: boolean) {
    this.props.isFavorite = isFavorite
  }

  get createdAt() {
    return this.props.createdAt
  }
  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt
  }
}
