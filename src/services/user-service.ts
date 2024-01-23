import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { userRepository } from '@/repositories'
import { duplicatedEmailError, invalidInputError } from '@/errors'

interface CreateUserParams {
  name: string
  email: string
  password: string
}

async function createUserService({
  name,
  email,
  password,
}: CreateUserParams): Promise<User> {
  if (!name || !email || !password) {
    throw invalidInputError('All fields are mandatory.')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw invalidInputError('Invalid email format.')
  }

  const existingUser = await userRepository.findByEmail(email)

  if (existingUser) {
    throw duplicatedEmailError()
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const newUser = await userRepository.create({
    name,
    email,
    password: hashedPassword,
  })

  return newUser
}

export const userService = {
  createUserService,
}
