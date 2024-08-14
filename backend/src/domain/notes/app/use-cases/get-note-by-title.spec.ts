import { describe, expect, it, beforeEach } from "vitest";
import { GetNoteByTitle } from "./get-note-by-title";
import { NoteFactory } from "@/test/factory/note-factory";
import { FakeNoteRepository } from "@/test/fake-repositories/fake-note-repository";

describe("Test get-note-by-title use-case", () => {
	let noteRepository: FakeNoteRepository;
	let sut: GetNoteByTitle;
	beforeEach(() => {
		noteRepository = new FakeNoteRepository();
		sut = new GetNoteByTitle(noteRepository);
	});
	it("Should get a note by title", async () => {
		const note = NoteFactory();
		noteRepository.save(note);
		const response = await sut.execute({
			title: note.title,
			userId: note.user_id
		});
		expect(response.isRight()).toBe(true);
		if (response.isRight()) {
			expect(response.value[0].title).toBe(note.title);
		}
	});
	it("Should return ResourceNotFoundError when note not found", async () => {
		const note = NoteFactory();
		const response = await sut.execute({
			title: "invalid-title",
			userId: note.user_id
		});
		expect(response.isLeft()).toBe(true);
		if (response.isLeft()) {
			expect(response.value.message).toBe("Note not found");
		}
	});
	it("Should return ResourceNotFoundError when userId is wrong", async () => {
		const note = NoteFactory();
		noteRepository.save(note);
		const response = await sut.execute({
			title: note.title,
			userId: "invalid-user-id"
		});
		expect(response.isLeft()).toBe(true);
		if (response.isLeft()) {
			expect(response.value.message).toBe("Note not found");
		}
	});
});
