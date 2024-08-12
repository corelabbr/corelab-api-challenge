import Note from "../../../../../src/domain/entity/note";
import { NotesRepository } from "../../../../../src/domain/repository/notes-repository";
import { UsersRepository } from "../../../../../src/domain/repository/users-repository";
import UpdateNoteInput from "../../../../../src/application/usecases/notes/update/update-note-input";
import UpdateNoteOutput from "../../../../../src/application/usecases/notes/update/update-note-output";
import UpdateNoteUseCase from "@/application/usecases/notes/update/update-note";
import User from '../../../../../src/domain/entity/user';

describe("UpdateNoteUseCase", () => {
  const userId = "user-id";
  const noteId = "note-id";
  const title = "Test Note";
  const content = "This is a test note";
  const color = "yellow";
  const favorite = false;
  const createdAt = new Date("2022-01-01");
  const updatedAt = new Date("2022-01-02");

  const user = User.fromUser('user-id');

  const notesRepository = {
    get: jest.fn().mockResolvedValue(
      Note.fromNote(noteId, user, title, content, color, favorite, createdAt, updatedAt)
    ),
    update: jest.fn(),
  } as unknown as NotesRepository;

  const usersRepository = {
    findUserById: jest.fn().mockResolvedValue(user),
  } as unknown as UsersRepository;

  const updateNoteInput = new UpdateNoteInput(
    noteId,
    userId,
    "Updated Note",
    "This is an updated note",
    "blue",
    true,
  );

  const updateNoteOutput = new UpdateNoteOutput({
    id: noteId,
    title: "Updated Note",
    content: "This is an updated note",
    color: "blue",
    favorite: true,
    createdAt,
    updatedAt: expect.any(Date),
  });

  it("should update a note successfully", async () => {
    const updateNoteUseCase = new UpdateNoteUseCase(notesRepository, usersRepository);

    const output = await updateNoteUseCase.execute(updateNoteInput);

    expect(usersRepository.findUserById).toHaveBeenCalledWith(userId);
    expect(notesRepository.get).toHaveBeenCalledWith(noteId, userId);
    expect(notesRepository.update).toHaveBeenCalledWith(expect.any(Note));
    expect(output).toEqual(updateNoteOutput);
  });

  it("should throw an error if user is not found", async () => {
    const updateNoteUseCase = new UpdateNoteUseCase(notesRepository, usersRepository);
    (usersRepository.findUserById as jest.Mock).mockResolvedValueOnce(null);

    await expect(updateNoteUseCase.execute(updateNoteInput)).rejects.toThrow("User not found!");
  });

  it("should throw an error if note is not found", async () => {
    const updateNoteUseCase = new UpdateNoteUseCase(notesRepository, usersRepository);
    (notesRepository.get as jest.Mock).mockResolvedValueOnce(null);

    await expect(updateNoteUseCase.execute(updateNoteInput)).rejects.toThrow("Note not found!");
  });

  it("should throw an error if update fails", async () => {
    const updateNoteUseCase = new UpdateNoteUseCase(notesRepository, usersRepository);
    (notesRepository.update as jest.Mock).mockRejectedValueOnce(new Error("Update failed"));

    await expect(updateNoteUseCase.execute(updateNoteInput)).rejects.toThrow("Error on update note.");
  });
});