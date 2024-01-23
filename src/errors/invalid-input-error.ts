import { ApplicationError } from '@/protocols'

export function invalidInputError(message?: string): ApplicationError {
  return {
    name: 'InvalidInputError',
    message: message ?? 'Invalid input.',
  }
}
