import { Router } from 'express'
import { singInPost } from '@/controllers'

const authenticationRouter = Router()

authenticationRouter.post('/', singInPost)

export { authenticationRouter }
