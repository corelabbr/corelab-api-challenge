import { NotesRepository } from "../../../../../../src/domain/repository/notes-repository";
import { UsersRepository } from "../../../../../../src/domain/repository/users-repository";
import SearchNoteInput from "../../../../../../src/application/usecases/notes/retrieve/search/search-note-input";
import SearchNoteOutput from "../../../../../../src/application/usecases/notes/retrieve/search/search-note-output";
import SearchNoteUseCase from "../../../../../../src/application/usecases/notes/retrieve/search/search-note";
import Note from '../../../../../../src/domain/entity/note';
import User from '../../../../../../src/domain/entity/user';

describe("SearchNoteUseCase", () => {
  const userId = "user-id";
  const keywords = "keyword1"
  const user = { id: userId };
  const notes = [
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
  const searchNoteInput = new SearchNoteInput(keywords, userId);
  const searchNoteOutput = new SearchNoteOutput(notes.map((note) => {
    return {
      id: note.getId(),
      title: note.getTitle(),
      content: note.getContent(),
      color: note.getColor(),
      favorite: note.getFavorite(),
      createdAt: note.getCreatedAt(),
      updatedAt: note.getUpdatedAt()
  }}));

  it("should search notes successfully", async () => {
    const notesRepository = {
      searchNotes: jest.fn().mockResolvedValue(notes),
    } as unknown as NotesRepository;
    const usersRepository = {
      findUserById: jest.fn().mockResolvedValue(user),
    } as unknown as UsersRepository;

    const searchNoteUseCase = new SearchNoteUseCase(notesRepository, usersRepository);
    const output = await searchNoteUseCase.execute(searchNoteInput);

    expect(usersRepository.findUserById).toHaveBeenCalledWith(userId);
    expect(notesRepository.searchNotes).toHaveBeenCalledWith(keywords, userId);
    expect(output).toEqual(searchNoteOutput);
  });

  it("should throw an error if user is not found", async () => {
    const notesRepository = {} as unknown as NotesRepository;
    const usersRepository = {
      findUserById: jest.fn().mockResolvedValue(null),
    } as unknown as UsersRepository;

    const searchNoteUseCase = new SearchNoteUseCase(notesRepository, usersRepository);

    await expect(searchNoteUseCase.execute(searchNoteInput)).rejects.toThrow("User not found");
  });

  it("should throw an error if there is an error searching notes", async () => {
    const notesRepository = {
      searchNotes: jest.fn().mockRejectedValue(new Error("Search failed")),
    } as unknown as NotesRepository;
    const usersRepository = {
      findUserById: jest.fn().mockResolvedValue(user),
    } as unknown as UsersRepository;

    const searchNoteUseCase = new SearchNoteUseCase(notesRepository, usersRepository);

    await expect(searchNoteUseCase.execute(searchNoteInput)).rejects.toThrow("Error searching notes");
  });
});