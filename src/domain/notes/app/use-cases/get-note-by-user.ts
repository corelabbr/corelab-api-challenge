import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/not_found";
import { UseCaseError } from "@/core/errors/use-case-error";
import { Note } from "../../entities/note";
import { NoteRepository } from "../repository/note-repository";
import { sortNotes } from "../utils/sort-notes";

interface GetNoteByUserDTO {
	user_id: string;
}

type GetNoteByUserResponse = Promise<Either<UseCaseError, Note[]>>;

export class GetNoteByUser {
	constructor(private noteRepository: NoteRepository) {}
	async execute({ user_id }: GetNoteByUserDTO): GetNoteByUserResponse {
		const notes = await this.noteRepository.findByUserId(user_id);
		if (notes.length === 0) {
			return left(new ResourceNotFoundError("Notes not found"));
		}
		return right(sortNotes(notes));
	}
}
