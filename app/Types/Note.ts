export interface INote {
    title: string;
    body: string;
    colorId: string;
    isFavorite: boolean;
    createdAt: Date;
    updatedAt: Date;
    updateTimestamp?: boolean;
}
