import Note from "../../../../domain/entity/note";
import { NotesRepository } from "../../../../domain/repository/notes-repository";
import { UsersRepository } from "../../../../domain/repository/users-repository";
import { UseCase } from "../../usecase";
import UpdateNoteInput from "./update-note-input";
import UpdateNoteOutput from "./update-note-output";

export default class UpdateNoteUseCase implements UseCase<UpdateNoteInput, UpdateNoteOutput> {

  constructor(
    private readonly notesRepository: NotesRepository,
    private readonly usersRepository: UsersRepository
  ) { }

  async execute(data: UpdateNoteInput): Promise<UpdateNoteOutput> {
    const user = await this.usersRepository.findUserById(data.userId);
    if (!user) throw new Error("User not found!")

    const note = await this.notesRepository.get(data.noteId, user.getId());
    if (!note) throw new Error("Note not found!")

    const newNote = Note.fromNote(
      note.getId(),
      user,
      data.title ?? note.getTitle(),
      data.content ?? note.getContent(),
      data.color ?? note.getColor(),
      data.favorite ?? note.getFavorite(),
      note.getCreatedAt(),
      new Date(Date.now())
    );
    
    try {
      await this.notesRepository.update(newNote);
      const output = new UpdateNoteOutput({
        id: newNote.getId(),
        title: newNote.getTitle(),
        content: newNote.getContent(),
        color: newNote.getColor(),
        favorite: newNote.getFavorite(),
        createdAt: newNote.getCreatedAt(),
        updatedAt: newNote.getUpdatedAt()
      })
      return output
    } catch (error) {
      throw new Error("Error on update note.")
    }
  }
}
