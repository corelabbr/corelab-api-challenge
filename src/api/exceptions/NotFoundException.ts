import ErrorException from './ErrorException'

class NotFoundException extends ErrorException {
  constructor(msg: string) {
    super()
    this.status = 404
    this.message = msg
  }
}

export default NotFoundException
