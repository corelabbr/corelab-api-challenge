import { NextFunction, Request, Response } from 'express'
import * as Joi from 'joi'

export function validateBody<T>(
  schema: Joi.ObjectSchema<T>,
): ValidationMiddleware {
  return validate(schema, 'body')
}

export function validateParams<T>(
  schema: Joi.ObjectSchema<T>,
): ValidationMiddleware {
  return validate(schema, 'params')
}

function validate(schema: Joi.ObjectSchema, type: 'body' | 'params') {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type], {
      abortEarly: false,
    })

    if (!error) {
      next()
    } else {
      const errorMessage = error.details.map((d) => d.message).join(' ')
      throw new Error(errorMessage)
    }
  }
}

type ValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void
