import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { AppError } from '../errors/AppError'
import { MulterError } from 'multer'

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

  if (error instanceof MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return response.status(400).json({ error: 'File size too large' })
    }
  }

  console.error(error)
  return response.status(500).json({ error: 'Internal server error' })
}
