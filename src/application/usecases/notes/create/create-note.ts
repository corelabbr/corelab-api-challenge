import { UseCase } from "../../usecase";
import { CreateNoteInput } from "./create-note-input";
import { NotesRepository } from '../../../../domain/repository/notes-repository';
import Note from "../../../../domain/entity/note";
import { UsersRepository } from "../../../../domain/repository/users-repository";
import { CreateNoteOutput } from "./create-note-output";
import ApiError from '../../../../domain/error/error';


export default class CreateNoteUseCase implements UseCase<CreateNoteInput, CreateNoteOutput> {
  constructor(
    private readonly notesRepository: NotesRepository,
    private readonly usersRepository: UsersRepository
  ) { }

  async execute(data: CreateNoteInput): Promise<CreateNoteOutput> {
    const user = await this.usersRepository.findUserById(data.userId);
    if (!user) throw new ApiError(404, "User not found");
    const note = Note.newNote(
      user,
      data.title,
      data.content,
      data.color,
      data.favorite
    );
    try {
      const savedNote = await this.notesRepository.create(note);
      const output = new CreateNoteOutput({
        id: savedNote.getId(),
        title: savedNote.getTitle(),
        content: savedNote.getContent(),
        color: savedNote.getColor(),
        favorite: savedNote.getFavorite(),
        createdAt: savedNote.getCreatedAt(),
        updatedAt: savedNote.getUpdatedAt()
      });

      return output;
    } catch (error) {
      throw new ApiError(400, "Note not created");
    }
  }
}
