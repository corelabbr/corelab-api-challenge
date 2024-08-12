import ApiError from '../../../../../domain/error/error';
import { NoteData } from "../../../../../domain/entity/note";
import { NotesRepository } from "../../../../../domain/repository/notes-repository";
import { UseCase } from "../../../usecase";
import ListNotesInput from "./list-notes-input";
import ListNotesOutput from "./list-notes-output";

export default class ListNotesUseCase implements UseCase<ListNotesInput, ListNotesOutput> {
  constructor(
    private readonly notesRepository: NotesRepository,
  ) {}
  async execute(data: ListNotesInput): Promise<ListNotesOutput> {
    try {
      const notes = await this.notesRepository.list(data.noteIds, data.userId);
      const noteData: Omit<NoteData, 'user'>[] = notes.map((note) => {
        if (note.getUser().getId() !== data.userId) throw new ApiError(403, "Forbidden")
        return {
          id: note.getId(),
          title: note.getTitle(),
          content: note.getContent(),
          color: note.getColor(),
          favorite: note.getFavorite(),
          createdAt: note.getCreatedAt(),
          updatedAt: note.getUpdatedAt()
        }
      })
      const output = new ListNotesOutput(noteData)
      return output;
      
    } catch (error) {
      throw new ApiError(500, "Something went wrong");
    }
  }
}
