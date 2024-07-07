import Joi from 'joi'

import joiObjectid from 'joi-objectid'
Joi.objectId = joiObjectid(Joi)

export const createNoteSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  color: Joi.string().required()
})
export const editNoteSchema = Joi.object({
  id: Joi.objectId().required(),
  title: Joi.string().required(),
  text: Joi.string().required(),
  color: Joi.string().required()
})
export const editFavoriteNoteSchema = Joi.object({
  id: Joi.objectId().required(),
  isFavorite: Joi.boolean().required()
})
export const deleteNoteSchema = Joi.object({
  id: Joi.objectId().required()
})
