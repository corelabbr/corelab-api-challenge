export class ResourceNotFoundException extends Error {
  constructor() {
    super('Resource no found')
  }
}
