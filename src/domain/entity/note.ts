import User from "./user";
import { v7 } from 'uuid'

export type NoteData = {
  id: string,
  user: User,
  title: string,
  content: string,
  color: string,
  favorite: boolean,
  createdAt: Date,
  updatedAt: Date
}

export default class Note {
  private constructor(
    private readonly id: string,
    private readonly user: User,
    private title: string,
    private content: string,
    private color: string,
    private favorite: boolean,
    private readonly createdAt: Date,
    private updatedAt: Date
  ) { }

  static newNote(
    user: User,
    title: string,
    content: string,
    color: string,
    favorite: boolean
  ): Note {
    const id = v7();
    const now = new Date(Date.now());
    return new Note(
      id,
      user,
      title,
      content,
      color,
      favorite,
      now,
      now
    )
  }
  static fromNote(
    id: string,
    user: User,
    title: string,
    content: string,
    color: string,
    favorite: boolean,
    createdAt: Date,
    updatedAt: Date
  ): Note {
    return new Note(
      id,
      user,
      title,
      content,
      color,
      favorite,
      createdAt,
      updatedAt
    )
  }

  getId(): string {
    return this.id;
  }
  getUser(): User {
    return this.user
  }
  getTitle(): string {
    return this.title
  }
  getContent(): string {
    return this.content
  }
  getColor(): string {
    return this.color
  }
  getFavorite(): boolean {
    return this.favorite
  }
  getCreatedAt(): Date {
    return this.createdAt
  }
  getUpdatedAt(): Date {
    return this.updatedAt
  }
  private updateUpdatedAt() {
    this.updatedAt = new Date(Date.now())
  }
  updateNote(note: Note) {
    this.title = note.title
    this.content = note.content
    this.color = note.color
    this.favorite = note.favorite
    this.updateUpdatedAt()
  }


}
