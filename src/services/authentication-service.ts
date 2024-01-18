import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userRepository, authenticationRepository } from '@/repositories'
import { exclude } from '@/utils/prisma-utils'
import { invalidCredentialsError, userNotFoundError } from '@/errors'

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params

  const user = await getUserOrFail(email)

  await validatePasswordOrFail(password, user.password)

  const token = await createSession(user.id)

  return {
    user: exclude(user, 'password'),
    token,
  }
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, {
    id: true,
    email: true,
    password: true,
  })

  if (!user) {
    throw userNotFoundError()
  }

  return user
}

async function createSession(userId: number): Promise<string> {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET ?? '')

  await authenticationRepository.createSession({
    token,
    userId,
  })

  return token
}

async function validatePasswordOrFail(
  password: string,
  userPassword: string,
): Promise<void> {
  const isPasswordValid = await bcrypt.compare(password, userPassword)

  if (!isPasswordValid) {
    throw invalidCredentialsError()
  }
}

export type SignInParams = Pick<User, 'email' | 'password'>

type SignInResult = {
  user: Pick<User, 'id' | 'email'>
  token: string
}

type GetUserOrFailResult = Pick<User, 'id' | 'email' | 'password'>

export const authenticationService = {
  signIn,
  validatePasswordOrFail,
  createSession,
  getUserOrFail,
}
