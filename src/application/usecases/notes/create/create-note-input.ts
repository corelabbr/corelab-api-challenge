export class CreateNoteInput {
  constructor(
    readonly userId: string,
    readonly title: string,
    readonly content: string,
    readonly color: string,
    readonly favorite: boolean
  ) {}
}