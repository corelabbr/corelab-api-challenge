import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/not_found";
import { UseCaseError } from "@/core/errors/use-case-error";
import { NoteRepository } from "../repository/note-repository";
import { Note } from "../../entities/note";

interface UpdateNoteDTO {
	color?: number;
	fav?: boolean;
	id: string;
	title?: string;
	file?: string;
	user_id: string;
}

type UpdateNoteResponse = Promise<Either<UseCaseError, Note>>;

export class UpdateNote {
	constructor(private noteRepository: NoteRepository) {}
	async execute({
		id,
		title,
		fav,
		color,
		file,
		user_id
	}: UpdateNoteDTO): UpdateNoteResponse {
		const note = await this.noteRepository.findById(id);
		if (!note) {
			return left(new ResourceNotFoundError("Note not found"));
		}
		if (note.user_id !== user_id) {
			return left(new ResourceNotFoundError("Note not found"));
		}

		if (fav !== undefined) {
			note.fav = fav;
		}
		if (color !== undefined) {
			note.color = color;
		}
		if (file !== undefined) {
			note.file = file;
		}
		if (title !== undefined) {
			const noteByTitle = await this.noteRepository.findByUserIdAndTitle(
				user_id,
				title
			);
			let equal = false;
			noteByTitle?.forEach((note) => {
				if (note.title === title) {
					equal = true;
				}
			});
			if (equal) {
				return left(new ResourceNotFoundError("Note already exists"));
			}
			note.title = title;
		}
		await this.noteRepository.update(note);

		return right(note);
	}
}
