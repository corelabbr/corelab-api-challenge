export type TaskDTO = {
  id?: string | null
  title: string
  body: string
  color: string
  favorited: boolean
}

export class Task {
  public id?: string | null
  public title: string
  public body: string
  public color: string
  public favorited: boolean

  private constructor(props: TaskDTO) {
    this.id = props.id
    this.title = props.title
    this.body = props.body
    this.color = props.color
    this.favorited = props.favorited
  }

  public static create(props: TaskDTO): Task {
    const task = new Task(props)
    return task
  }
}
