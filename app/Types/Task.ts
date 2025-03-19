export interface ITask {
    id: number;
    title: string;
    description: string | null;
    isCompleted: boolean;
    isFavorite: boolean;
    color: string | null;
    createdAt: Date;
    updatedAt: Date;
}
