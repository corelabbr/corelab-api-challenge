import vine from '@vinejs/vine'

export const createTaskValidator = vine.compile(
    vine.object({
        title : vine.string().trim(),
        body : vine.string().trim().escape(),
        favorite : vine.boolean(),
        color : vine.string().hexCode()
    })
)

export const updaetTaskValidator = vine.compile(
    vine.object({
        title : vine.string().trim().optional(),
        body : vine.string().trim().escape().optional(),
        favorite : vine.boolean().optional(),
        color : vine.string().hexCode().optional()
    })
)