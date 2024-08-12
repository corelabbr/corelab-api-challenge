import Note from "../../../src/domain/entity/note";
import User from "../../../src/domain/entity/user";


describe("Note", () => {
  const user = User.newUser();
  const title = "Test Note";
  const content = "This is a test note";
  const color = "yellow";
  const favorite = false;

  it("should create a new note", () => {
    const note = Note.newNote(user, title, content, color, favorite);

    expect(note.getId()).toBeDefined();
    expect(note.getUser()).toBe(user);
    expect(note.getTitle()).toBe(title);
    expect(note.getContent()).toBe(content);
    expect(note.getColor()).toBe(color);
    expect(note.getFavorite()).toBe(favorite);
    expect(note.getCreatedAt()).toBeInstanceOf(Date);
    expect(note.getUpdatedAt()).toBeInstanceOf(Date);
  });

  it("should update a note", () => {
    const note = Note.newNote(user, title, content, color, favorite);
    const updatedTitle = "Updated Note";
    const updatedContent = "This is an updated note";
    const updatedColor = "blue";
    const updatedFavorite = true;

    const updatedNote = Note.fromNote(
      note.getId(),
      note.getUser(),
      updatedTitle,
      updatedContent,
      updatedColor,
      updatedFavorite,
      note.getCreatedAt(),
      note.getUpdatedAt()
    );

    note.updateNote(updatedNote);

    expect(note.getTitle()).toBe(updatedTitle);
    expect(note.getContent()).toBe(updatedContent);
    expect(note.getColor()).toBe(updatedColor);
    expect(note.getFavorite()).toBe(updatedFavorite);
    expect(note.getUpdatedAt()).toBeInstanceOf(Date);
  });
});