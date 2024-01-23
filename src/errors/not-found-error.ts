import { ApplicationError } from '@/protocols'

export function notFoundError(message: string): ApplicationError {
  return {
    name: 'NotFoundError',
    message: message,
  }
}

export function userNotFoundError(): ApplicationError {
  return {
    name: 'UserNotFoundError',
    message: 'User not found',
  }
}
