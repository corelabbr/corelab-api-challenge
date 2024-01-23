import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { unauthorizedError } from '@/errors'
import { authenticationRepository } from '@/repositories'

export async function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.header('Authorization')
  if (!authHeader) throw unauthorizedError()

  const token = authHeader.split(' ')[1]
  if (!token) throw unauthorizedError()

  if (!process.env.JWT_SECRET) {
    throw new Error('Chave JWT não definida no ambiente.')
  }

  let decodedToken: any

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    throw unauthorizedError()
  }

  const { userId } = decodedToken as JWTPayload

  const session = await authenticationRepository.findSession(token)
  if (!session) throw unauthorizedError()

  req.userId = userId
  next()
}

export type AuthenticatedRequest = Request & JWTPayload

type JWTPayload = {
  userId: number
}
