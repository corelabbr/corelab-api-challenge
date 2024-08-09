export class Task {
    id?: string
    title: string
    content: string
    color: string
    favorite?: boolean
    created_at?: Date

    constructor(props: Task) {
        this.id = props.id
        this.title = props.title
        this.content = props.content
        this.color = props.color
        this.favorite = props.favorite
        this.created_at = props.created_at
    }
}
