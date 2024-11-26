export class File {
    id?: string
    file_name: string
    task_id: string

    constructor(props: File) {
        this.id = props.id
        this.file_name = props.file_name
        this.task_id = props.task_id
    }
}
