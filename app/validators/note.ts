import vine from '@vinejs/vine'

export const saveNoteValidator = vine.compile(
  vine.object({
    title: vine.string().trim().maxLength(255),
    body: vine.string().trim(),
    color: vine.string().trim().maxLength(255),
    favorited: vine.boolean(),
  })
)
