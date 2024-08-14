import { FakeNoteRepository } from "@/test/fake-repositories/fake-note-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteNote } from "./delete-note";

import { NoteFactory } from "@/test/factory/note-factory";
import { ResourceNotFoundError } from "@/core/errors/errors/not_found";
describe("Test delete note use case", () => {
	let noteRepository: FakeNoteRepository;
	let sut: DeleteNote;
	beforeEach(() => {
		noteRepository = new FakeNoteRepository();
		sut = new DeleteNote(noteRepository);
	});
	it("should delete a note if given note id exists", async () => {
		const note = NoteFactory();
		noteRepository.save(note);
		const response = await sut.execute({ id: note.id });
		expect(response.isRight()).toBe(true);
		expect(response.value).toBe(null);
		expect(await noteRepository.findById(note.id)).toBeUndefined();
	});
	it("should return a ResourceNotFoundError if given note id does not exist", async () => {
		const response = await sut.execute({ id: "invalid_note_id" });
		expect(response.isLeft()).toBe(true);
		expect(response.value).instanceOf(ResourceNotFoundError);
	});
});
