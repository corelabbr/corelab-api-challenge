import { createNoteDTO } from './dtos/createNoteDTO'
import { updateNoteDTO } from './dtos/updateNoteDTO'

type noteProps<T = string> = {
  id: T
  title: string
  content: string
  isFavorite: boolean
  createdAt: Date
  updatedAt: Date
  fileUrl: string | null
  color: string | null
}

export class Note<T> {
  private readonly props: noteProps<T>
  constructor(props: noteProps<T>) {
    this.props = props
  }

  update(props: updateNoteDTO) {
    this.props.title =
      props.title !== undefined ? props.title : this.props.title
    this.props.content =
      props.content !== undefined ? props.content : this.props.content
    this.props.isFavorite =
      props.isFavorite !== undefined ? props.isFavorite : this.props.isFavorite
    this.props.fileUrl =
      props.fileUrl !== undefined ? props.fileUrl : this.props.fileUrl
    this.props.color =
      props.color !== undefined ? props.color : this.props.color
    this.props.updatedAt = new Date()
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      isFavorite: this.isFavorite,
      fileUrl: this.fileUrl,
      color: this.color,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  static create(props: createNoteDTO): Note<null> {
    const note = new Note({
      id: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      content: props.content,
      title: props.title,
      isFavorite: props.isFavorite,
      fileUrl: props.fileUrl || null,
      color: props.color || null,
    })

    return note
  }

  cloneWith(props: Partial<noteProps<T>>): Note<T> {
    return new Note({
      ...this.props,
      ...props,
    })
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

  get fileUrl(): string | null {
    return this.props.fileUrl
  }
  set fileUrl(fileUrl: string) {
    this.props.fileUrl = fileUrl
  }

  get color(): string | null {
    return this.props.color
  }
  set color(color: string) {
    this.props.color = color
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
