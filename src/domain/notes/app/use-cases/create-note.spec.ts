import { FakeNoteRepository } from "@/test/fake-repositories/fake-note-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateNote } from "./create-note";
import { NoteFactory } from "@/test/factory/note-factory";
import { Note } from "../../entities/note";

describe("Test createNote use case", () => {
	let noteRepository: FakeNoteRepository;
	let sut: CreateNote;
	beforeEach(() => {
		noteRepository = new FakeNoteRepository();
		sut = new CreateNote(noteRepository);
	});
	it("should return a note", async () => {
		const response = await sut.execute({
			title: "title",
			fav: false,
			color: 1,
			file: "file",
			user_id: "user_id"
		});
		expect(response.isRight()).toBe(true);

		expect(response.value).toBeInstanceOf(Note);
	});
	it("should not create a note if already exists one with the same title", async () => {
		const note = NoteFactory();
		noteRepository.save(note);
		const response = await sut.execute({
			title: note.title,
			fav: false,
			color: 1,
			file: "file",
			user_id: note.user_id
		});
		expect(response.isLeft()).toBe(true);
	});
});
