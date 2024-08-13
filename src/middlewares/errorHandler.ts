import { NextFunction, Request, Response } from 'express'
import ErrorException from '../api/exceptions/ErrorException'

function logError(
  err: ErrorException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err)
  next(err)
}

function errorHandler(
  err: ErrorException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  next()

  if (!(err instanceof ErrorException)) {
    err = new ErrorException()
  }

  return res.status(err.status).json(err.message)
}

export { logError, errorHandler }
