type noteProps = {
  id: string
  title: string
  content: string
  isFavorite: boolean
  createdAt: Date
  updatedAt: Date
  fileUrl?: string
  color?: string
}

export class Note {
  constructor(private readonly props: noteProps) {}

  get id() {
    return this.props.id
  }
  set id(id: string) {
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
