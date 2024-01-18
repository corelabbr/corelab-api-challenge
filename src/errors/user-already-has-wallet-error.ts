import { ApplicationError } from '@/protocols'

export function UserAlreadyHasWalletError(): ApplicationError {
  return {
    name: 'UserAlreadyHasWalletError',
    message: 'User already has a wallet.',
  }
}
