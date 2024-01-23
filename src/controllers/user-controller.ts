import { Request, Response } from 'express'
import { userService } from '@/services'
import httpStatus from 'http-status'

export async function createUserController(
  req: Request,
  res: Response,
): Promise<void> {
  const { name, email, password } = req.body

  const user = await userService.createUserService({ name, email, password })

  res.status(httpStatus.CREATED).json(user)
}
