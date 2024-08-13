import errors from '../errors'

export default class ErrorException extends Error {
  status: number

  constructor() {
    super()
    this.status = 500
    this.message = errors.internalServerError
  }
}
