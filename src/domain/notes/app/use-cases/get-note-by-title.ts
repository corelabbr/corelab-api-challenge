import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/not_found";
import { UseCaseError } from "@/core/errors/use-case-error";
import { Note } from "../../entities/note";
import { NoteRepository } from "../repository/note-repository";

export interface GetNoteByTitleDTO {
	title: string;
	userId: string;
}

type GetNoteByTitleResponse = Promise<Either<UseCaseError, Note[]>>;

export class GetNoteByTitle {
	constructor(private noteRepository: NoteRepository) {}

	async execute({ title, userId }: GetNoteByTitleDTO): GetNoteByTitleResponse {
		const note = await this.noteRepository.findByUserIdAndTitle(userId, title);
		if (!note || note.length === 0) {
			return left(new ResourceNotFoundError("Note not found"));
		}

		return right(note);
	}
}
