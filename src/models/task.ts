export type TaskDTO = {
  id?: string | null
  title: string
  body?: string | null
  color: string
  completed?: boolean | null
  favorited: boolean
}

export class Task {
  public id?: string | null
  public title: string
  public body?: string | null
  public color: string
  public completed?: boolean | null
  public favorited: boolean

  private constructor(props: TaskDTO) {
    this.id = props.id
    this.title = props.title
    this.body = props.body
    this.color = props.color
    this.completed = props.completed
    this.favorited = props.favorited
  }

  public static create(props: TaskDTO): Task {
    const task = new Task(props)
    return task
  }
}
