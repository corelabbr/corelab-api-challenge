import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/not_found";
import { UseCaseError } from "@/core/errors/use-case-error";
import { NoteRepository } from "../repository/note-repository";

interface DeleteNoteDTO {
	id: string;
}

type DeleteNoteResponse = Promise<Either<UseCaseError, null>>;

export class DeleteNote {
	constructor(private noteRepository: NoteRepository) {}

	async execute({ id }: DeleteNoteDTO): DeleteNoteResponse {
		const note = await this.noteRepository.findById(id);
		if (!note) {
			return left(new ResourceNotFoundError("Note not found"));
		}
		await this.noteRepository.remove(note.id);
		return right(null);
	}
}
