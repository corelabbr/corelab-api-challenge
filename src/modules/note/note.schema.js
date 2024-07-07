import Joi from 'joi'

import joiObjectid from 'joi-objectid'
Joi.objectId = joiObjectid(Joi)

export const createNoteSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  color: Joi.string().required()
})
