export interface INotes {
    id: string,
    title: string,
    text: string,
    color: string,
    favorite: boolean,
}

export interface INotesRepository {
    create(data: INotes): Promise<void>
    update(data: INotes): Promise<void>
    findByFavorite(favorite: boolean): Promise<INotes[]>
    findByColor(color: string): Promise<INotes[]>
    findById(id: string): Promise<INotes | void>
    findAll(): Promise<INotes[]>
    delete(id: string): Promise<void>
}