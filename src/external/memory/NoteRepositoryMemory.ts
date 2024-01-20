import Note from "../../core/notes/model/Note";
import NoteRepository from "../../core/notes/service/NotesRepository";

export default class NoteRepositoryMemory implements NoteRepository{

    private readonly notes: Note[] = [];

    async get(): Promise<Note[]> {
        return this.notes;
    }

    async getOne(id: string): Promise<Note | null> {
        return this.notes.find(note => note.id === id) ?? null
    }

    async post(note: Note): Promise<Note> {
        const newNote = { ...note, id: String(Math.random())}
        this.notes.push(newNote);
        return newNote;
    }

    async put(id: string, data: Note): Promise<Note | string> {
        let note = this.notes.find(item => item.id == id);

        if(!note) return 'not found';

        note.title = data.title;
        note.desc = data.desc;
        note.color = data.color;

        return note;
    }

    async delete(id: string): Promise<Note | string>{
        const note = this.notes.find(item => item.id === id);

        if(!note) return 'not found';
        
        this.notes.splice(this.notes.indexOf(note), 1);

        return note;
    }
}
