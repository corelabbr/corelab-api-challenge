
import ApiError from '../../../../../domain/error/error';
import { NotesRepository } from "../../../../../domain/repository/notes-repository";
import { UseCase } from "../../../usecase";
import GetNoteInput from "./get-note-input";
import GetNoteOutput from "./get-note-output";

export default class GetNoteUseCase implements UseCase<GetNoteInput, GetNoteOutput> {
  constructor(
    private readonly notesRepository: NotesRepository,
  ) {}
  async execute(data: GetNoteInput): Promise<GetNoteOutput> {
    const note = await this.notesRepository.get(data.noteId, data.userId);
    if (!note) throw new ApiError(404, "Note not found");
    if (note.getUser().getId() !== data.userId) throw new ApiError(403, "Forbidden");
    const output = new GetNoteOutput({
      id: note.getId(),
      title: note.getTitle(),
      content: note.getContent(),
      color: note.getColor(),
      favorite: note.getFavorite(),
      createdAt: note.getCreatedAt(),
      updatedAt: note.getUpdatedAt()
    });
    return output;
  }
}
