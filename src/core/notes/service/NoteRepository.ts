import Note from "../model/Note"

export default interface NotesRepository {
    get(): Promise<Note[]>
    getOne(title: string): Promise<Note | null>
    getById(id: number): Promise<Note | null>
    getByColor(color: string): Promise<Note[]>
    post(note: Note): Promise<Note>
    put(id: number, note:Note): Promise<Note | string>
    delete(id: number): Promise<Note | string>
}