import ErrorException from './ErrorException'

class BadRequestException extends ErrorException {
  constructor(message: string) {
    super()
    this.message = message
    this.status = 400
  }
}

export default BadRequestException
