import { NotesRepository } from "../../../../../../src/domain/repository/notes-repository";
import GetNoteInput from "../../../../../../src/application/usecases/notes/retrieve/get/get-note-input";
import GetNoteOutput from "../../../../../../src/application/usecases/notes/retrieve/get/get-note-output";
import GetNoteUseCase from "../../../../../../src/application/usecases/notes/retrieve/get/get-note";

describe("GetNoteUseCase", () => {
  const noteId = "note-id";
  const userId = "user-id";
  const title = "Test Note";
  const content = "This is a test note";
  const color = "yellow";
  const favorite = false;
  const createdAt = new Date("2022-01-01");
  const updatedAt = new Date("2022-01-02");
  const notesRepository = {
    get: jest.fn().mockResolvedValue({
      getId: () => noteId,
      getTitle: () => title,
      getContent: () => content,
      getColor: () => color,
      getFavorite: () => favorite,
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt,
    }),
  } as unknown as NotesRepository;
  const getNoteInput = new GetNoteInput(noteId, userId);
  const getNoteOutput = new GetNoteOutput({
    id: noteId,
    title,
    content,
    color,
    favorite,
    createdAt,
    updatedAt,
  });

  it("should retrieve a note successfully", async () => {
    const getNoteUseCase = new GetNoteUseCase(notesRepository);
    const output = await getNoteUseCase.execute(getNoteInput);
    expect(notesRepository.get).toHaveBeenCalledWith(noteId, userId);
    expect(output).toEqual(getNoteOutput);
  });

  it("should throw an error if note is not found", async () => {
    const getNoteUseCase = new GetNoteUseCase(notesRepository);
    (notesRepository.get as jest.Mock).mockResolvedValueOnce(null);
    await expect(getNoteUseCase.execute(getNoteInput)).rejects.toThrow("Note not found");
  });
});