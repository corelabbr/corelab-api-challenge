import { Either, left, right } from "@/core/either";
import { UseCaseError } from "@/core/errors/use-case-error";
import { Color } from "../../entities/color";
import { Note } from "../../entities/note";
import { NoteRepository } from "../repository/note-repository";
import { AlreadyExistsError } from "@/core/errors/errors/already_exists";

interface CreateNoteDTO {
	title: string;
	fav: boolean;
	color: Color;
	file: string | null;
	user_id: string;
}

type CreateNoteResponse = Promise<Either<UseCaseError, Note>>;

export class CreateNote {
	constructor(private noteRepository: NoteRepository) {}
	async execute({
		title,
		fav,
		color,
		file,
		user_id
	}: CreateNoteDTO): CreateNoteResponse {
		const noteExists = await this.noteRepository.findByUserIdAndTitle(
			user_id,
			title
		);
		if (noteExists) {
			let exists = false;
			noteExists.map((note) => {
				if (note.title === title) {
					exists = true;
				}
			});
			if (exists) {
				return left(new AlreadyExistsError("Note already exists"));
			}
		}
		const note = Note.create({
			title,
			fav,
			color,
			file,
			user_id
		});
		await this.noteRepository.save(note);
		return right(note);
	}
}
