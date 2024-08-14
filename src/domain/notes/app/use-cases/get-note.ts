import { Either, left, right } from "@/core/either";
import { Note } from "../../entities/note";
import { NoteRepository } from "../repository/note-repository";
import { UseCaseError } from "@/core/errors/use-case-error";
import { ResourceNotFoundError } from "@/core/errors/errors/not_found";

interface GetNoteDTO {
	id: string;
}

type GetNoteResponse = Promise<Either<UseCaseError, Note>>;

export class GetNote {
	constructor(private noteRepository: NoteRepository) {}
	async execute({ id }: GetNoteDTO): GetNoteResponse {
		const note = await this.noteRepository.findById(id);
		if (!note) {
			return left(new ResourceNotFoundError("Note not found"));
		}
		return right(note);
	}
}
