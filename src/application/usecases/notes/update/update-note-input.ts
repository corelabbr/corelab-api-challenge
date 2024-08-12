export default class UpdateNoteInput {
  constructor(
    readonly noteId: string,
    readonly userId: string,
    readonly title?: string,
    readonly content?: string,
    readonly color?: string,
    readonly favorite?: boolean
  ) { }
}
