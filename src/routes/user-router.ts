import { Router } from 'express'
import { createUserController } from '@/controllers'

const userRouter: Router = Router()

userRouter.post('/', createUserController)

export { userRouter }
