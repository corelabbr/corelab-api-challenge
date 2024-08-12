import { NotesRepository } from '../../../../../src/domain/repository/notes-repository';
import { UsersRepository } from "../../../../../src/domain/repository/users-repository";
import { CreateNoteInput } from "../../../../../src/application/usecases/notes/create/create-note-input";
import { CreateNoteOutput } from "../../../../../src/application/usecases/notes/create/create-note-output";
import Note from "../../../../../src/domain/entity/note";
import CreateNoteUseCase from '../../../../../src/application/usecases/notes/create/create-note';
import User from '../../../../../src/domain/entity/user';

describe("CreateNoteUseCase", () => {
  let createNoteUseCase: CreateNoteUseCase;
  let notesRepository: NotesRepository;
  let usersRepository: UsersRepository;

  beforeEach(() => {
    notesRepository = {
      create: jest.fn(),
    } as unknown as NotesRepository;

    usersRepository = {
      findUserById: jest.fn(),
    } as unknown as UsersRepository;

    createNoteUseCase = new CreateNoteUseCase(notesRepository, usersRepository);
  });

  it("should create a new note and return the output", async () => {
    const userId = "12345";
    const title = "Test Note";
    const content = "This is a test note";
    const color = "blue";
    const favorite = true;

    const user = User.fromUser(userId);

    const note = Note.newNote(
      user,
      title,
      content,
      color,
      favorite
    )

    const createNoteInput = new CreateNoteInput(
      userId,
      title,
      content,
      color,
      favorite,
    );

    const expectedOutput = new CreateNoteOutput({
      id: note.getId(),
      title,
      content,
      color,
      favorite,
      createdAt: note.getCreatedAt(),
      updatedAt: note.getUpdatedAt()
    });

    (usersRepository.findUserById as jest.Mock).mockResolvedValue(user);
    (notesRepository.create as jest.Mock).mockResolvedValue(note);

    const result = await createNoteUseCase.execute(createNoteInput);

    expect(usersRepository.findUserById).toHaveBeenCalledWith(userId);
    expect(notesRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        user,
        title,
        content,
        color,
        favorite,
      })
    );
    expect(result).toEqual(expectedOutput);
  });

  it("should throw an error if user is not found", async () => {
    const userId = "12345";
    const title = "Test Note";
    const content = "This is a test note";
    const color = "blue";
    const favorite = true;

    const createNoteInput: CreateNoteInput = {
      userId,
      title,
      content,
      color,
      favorite,
    };

    (usersRepository.findUserById as jest.Mock).mockResolvedValue(null);

    await expect(createNoteUseCase.execute(createNoteInput)).rejects.toThrow(
      "User not found"
    );

    expect(usersRepository.findUserById).toHaveBeenCalledWith(userId);
    expect(notesRepository.create).not.toHaveBeenCalled();
  });

  it("should throw an error if note is not created", async () => {
    const userId = "12345";
    const title = "Test Note";
    const content = "This is a test note";
    const color = "blue";
    const favorite = true;

    const user = {
      id: userId,
      // Add other user properties as needed
    };

    const createNoteInput: CreateNoteInput = {
      userId,
      title,
      content,
      color,
      favorite,
    };

    (usersRepository.findUserById as jest.Mock).mockResolvedValue(user);
    (notesRepository.create as jest.Mock).mockRejectedValue(new Error("Note not created"));

    await expect(createNoteUseCase.execute(createNoteInput)).rejects.toThrow(
      "Note not created"
    );

    expect(usersRepository.findUserById).toHaveBeenCalledWith(userId);
    expect(notesRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        user,
        title,
        content,
        color,
        favorite,
      })
    );
  });
});