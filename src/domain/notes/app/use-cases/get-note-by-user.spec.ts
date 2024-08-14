import { describe, expect, it, beforeEach } from "vitest";
import { GetNoteByUser } from "./get-note-by-user";
import { FakeNoteRepository } from "@/test/fake-repositories/fake-note-repository";
import { NoteFactory } from "@/test/factory/note-factory";
import { Note } from "../../entities/note";
import { ResourceNotFoundError } from "@/core/errors/errors/not_found";

describe("Test getNoteByUser use case", () => {
	let noteRepository: FakeNoteRepository;
	let sut: GetNoteByUser;
	beforeEach(() => {
		noteRepository = new FakeNoteRepository();
		sut = new GetNoteByUser(noteRepository);
	});
	it("should return a list of notes if given userId exists ", async () => {
		const note = NoteFactory();
		noteRepository.save(note);
		const response = await sut.execute({ user_id: note.user_id });
		expect(response.isRight()).toBe(true);
		expect(response.value).toEqual([note]);
		expect((response.value as Note[])[0].id).toBe(note.id);
	});
	it("should return a ResourceNotFoundError if given userId does not exist ", async () => {
		const response = await sut.execute({ user_id: "invalid_user_id" });
		expect(response.isLeft()).toBe(true);
		expect(response.value).toBeInstanceOf(ResourceNotFoundError);
	});
});
