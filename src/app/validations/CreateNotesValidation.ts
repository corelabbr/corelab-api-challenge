import Joi from 'joi'

const idSchema = Joi.string().guid({ version: ['uuidv4'] }).required()

export const createNotesValidation = Joi.object({
    title: Joi.string()
        .min(0)
        .max(255)
        .messages({
            'string.max': 'Title should be at most 255 characters long.'
        }),
    
    text: Joi.string()
        .min(1)
        .max(1000)
        .required()
        .messages({
            'string.empty': 'Text is required.',
            'string.min': 'Text should be at least 1 character long.',
            'string.max': 'Text should be at most 1000 characters long.'
        }),

    color: Joi.string()
        .valid('red', 'green', 'blue', 'yellow', 'black', 'white')
        .messages({
            'string.valid': 'Color must be one of the following: red, green, blue, yellow, black, white.'
        }),

    favorite: Joi.boolean()
        .messages({
            'boolean.base': 'Favorite must be a boolean value.',
        })
})
