import { Note } from "@/domain/notes/entities/note";
import { NoteRepository } from "../note-repository";
import { db } from "@/db/drizzle";
import { note } from "@/db/schemas";
import { and, eq, ilike } from "drizzle-orm";

export class DrizzleNoteRepository implements NoteRepository {
	// Private helper method to map database results to the `Note` entity
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private mapToNote(result: any): Note {
		result.file = result.file || null; // Ensures the `file` field is `null` if undefined
		return Note.create(
			{
				title: result.title,
				color: result.color,
				fav: result.fav,
				user_id: result.user_id,
				file: result.file
			},
			result.id
		);
	}

	// Method to find a note by its ID
	async findById(id: string): Promise<Note | null> {
		const result = await db
			.select()
			.from(note)
			.where(eq(note.id, id))
			.limit(1)
			.execute();

		// Returns the mapped note or `null` if no result is found
		return result.length > 0 ? this.mapToNote(result[0]) : null;
	}

	// Method to find all notes associated with a specific user
	async findByUserId(userId: string): Promise<Note[]> {
		const response = await db
			.select()
			.from(note)
			.where(eq(note.user_id, userId))
			.execute();

		// Maps the results to the `Note` entity
		return response.map(this.mapToNote);
	}

	// Method to find a note by its title
	async findByTitle(title: string): Promise<Note | null> {
		const response = await db
			.select()
			.from(note)
			.where(eq(note.title, title))
			.limit(1)
			.execute();

		// Returns the mapped note or `null` if no result is found
		return response.length > 0 ? this.mapToNote(response[0]) : null;
	}

	// Method to save a new note to the database
	async save(object: Note): Promise<void> {
		await db
			.insert(note)
			.values({
				id: object.id,
				created_at: new Date(), // Sets the creation date for the new note
				title: object.title,
				color: object.color,
				fav: object.fav,
				user_id: object.user_id,
				file: object.file
			})
			.execute();
	}

	// Method to update an existing note in the database
	async update(object: Note): Promise<void> {
		await db
			.update(note)
			.set({
				title: object.title,
				color: object.color,
				fav: object.fav,
				file: object.file
			})
			.where(eq(note.id, object.id));
	}

	// Method to find a specific note by user ID and title
	async findByUserIdAndTitle(
		userId: string,
		title: string
	): Promise<Note[] | null> {
		const response = await db
			.select()
			.from(note)
			.where(and(eq(note.user_id, userId), ilike(note.title, `%${title}%`)))
			.execute();

		return response.map(this.mapToNote);
	}

	// Method to remove a note by its ID
	async remove(id: string): Promise<void> {
		await db.delete(note).where(eq(note.id, id)).execute();
	}
}
