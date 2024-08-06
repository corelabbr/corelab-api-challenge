import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { AppError } from '../errors/AppError'

export const errorHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return response.status(400).json({ error: error.errors })
  }
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ error: error.message })
  }

  return response.status(500).json({ error: 'Internal server error' })
}
