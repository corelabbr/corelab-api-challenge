export type TaskProps = {
    id: string;
    title: string;
    is_favorite: boolean;
    color: string;
}

export class TaskEntity {
    private constructor(
        private props: TaskProps
    ) { }

    public static create(title: string, is_favorite: boolean, color: string) {
        return new TaskEntity({
            id: crypto.randomUUID().toString(),
            title,
            is_favorite,
            color
        })
    }

    public static restore(props: TaskProps) {
        return new TaskEntity(props)
    }

    public get id() {
        return this.props.id
    }

    public get title() {
        return this.props.title
    }

    public get is_favorite() {
        return this.props.is_favorite
    }

    public get color() {
        return this.props.color
    }
}
