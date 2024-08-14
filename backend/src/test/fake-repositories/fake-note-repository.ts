import { NoteRepository } from "@/domain/notes/app/repository/note-repository";
import { Note } from "@/domain/notes/entities/note";

export class FakeNoteRepository implements NoteRepository {
	public notes: Note[] = [];
	async findById(id: string): Promise<Note | null> {
		return this.notes.filter((note) => note.id === id)[0];
	}
	async findByUserId(userId: string): Promise<Note[]> {
		return this.notes.filter((note) => note.user_id === userId);
	}
	async findByTitle(title: string): Promise<Note | null> {
		return this.notes.filter((note) => note.title === title)[0];
	}
	async save(note: Note): Promise<void> {
		this.notes.push(note);
		return;
	}
	async update(note: Note): Promise<void> {
		const index = this.notes.findIndex((n) => n.id === note.id);
		this.notes[index] = note;
		return;
	}
	async remove(id: string): Promise<void> {
		const index = this.notes.findIndex((n) => n.id === id);
		this.notes.splice(index, 1);
		return;
	}
	async findByUserIdAndTitle(
		userId: string,
		title: string
	): Promise<Note[] | null> {
		return this.notes.filter(
			(note) => note.user_id === userId && note.title.includes(title)
		);
	}
}
