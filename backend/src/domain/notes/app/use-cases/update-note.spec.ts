import { ResourceNotFoundError } from "@/core/errors/errors/not_found";
import { NoteFactory } from "@/test/factory/note-factory";
import { FakeNoteRepository } from "@/test/fake-repositories/fake-note-repository";
import { expect, beforeEach, describe, it } from "vitest";
import { UpdateNote } from "./update-note";

describe("Test update note use case", () => {
	let noteRepository: FakeNoteRepository;
	let sut: UpdateNote;
	beforeEach(() => {
		noteRepository = new FakeNoteRepository();
		sut = new UpdateNote(noteRepository);
	});
	it("should update a note if given note id exists", async () => {
		const note = NoteFactory();
		noteRepository.save(note);
		const response = await sut.execute({
			id: note.id,
			fav: true,
			user_id: note.user_id
		});
		expect(response.isRight()).toBe(true);
		expect(response.value).toBe(note);
		const updatedNote = await noteRepository.findById(note.id);
		expect(updatedNote?.fav).toBe(true);
	});
	it("should return a ResourceNotFoundError if given note id does not exist", async () => {
		const response = await sut.execute({
			id: "invalid_note_id",
			user_id: "user_id"
		});
		expect(response.isLeft()).toBe(true);
		expect(response.value).toBeInstanceOf(ResourceNotFoundError);
	});
});
