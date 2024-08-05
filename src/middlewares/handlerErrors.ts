import { NextFunction, Request, Response } from 'express'

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  console.error(error)
  return response.status(500).json({ error: 'Internal server error' })
}
