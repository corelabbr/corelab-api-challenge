import Note, { NoteData } from "../../../../../../src/domain/entity/note";
import { NotesRepository } from "../../../../../../src/domain/repository/notes-repository";
import ListNotesInput from "../../../../../../src/application/usecases/notes/retrieve/list/list-notes-input";
import ListNotesOutput from "../../../../../../src/application/usecases/notes/retrieve/list/list-notes-output";
import ListNotesUseCase from "../../../../../../src/application/usecases/notes/retrieve/list/list-notes";
import User from '../../../../../../src/domain/entity/user';

describe("ListNotesUseCase", () => {
  const noteIds = ["note-id-1", "note-id-2"];
  const userId = "user-id";
  const noteId = "note-id";
  const title = "Test Note";
  const content = "This is a test note";
  const color = "yellow";
  const favorite = false;
  const createdAt = new Date("2022-01-01");
  const updatedAt = new Date("2022-01-02");
  const noteData: Note[] = [
    Note.fromNote(
      "note-id-1",
      User.fromUser(userId),
       "Note 1",
       "This is note 1",
       "yellow",
       false,
       new Date("2022-01-01"),
       new Date("2022-01-02"),
    ),
    Note.fromNote(
      "note-id-2",
      User.fromUser(userId),
      "Note 2",
      "This is note 2",
      "blue",
      true,
      new Date("2022-01-03"),
      new Date("2022-01-04"),
    ),
  ];
  const notesRepository = {
    list: jest.fn().mockResolvedValue(noteData),
  } as unknown as NotesRepository;
  const listNotesInput = new ListNotesInput(noteIds, userId);
  const listNotesOutput = new ListNotesOutput(noteData.map((note) => {
    return {
      id: note.getId(),
      title: note.getTitle(),
      content: note.getContent(),
      color: note.getColor(),
      favorite: note.getFavorite(),
      createdAt: note.getCreatedAt(),
      updatedAt: note.getUpdatedAt()
  }}));

  it("should list notes successfully", async () => {
    const listNotesUseCase = new ListNotesUseCase(notesRepository);
    const output = await listNotesUseCase.execute(listNotesInput);
    expect(notesRepository.list).toHaveBeenCalledWith(noteIds, userId);
    expect(output).toEqual(listNotesOutput);
  });
});