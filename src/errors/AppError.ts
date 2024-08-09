export class AppError {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
  ) {}

  static badRequest(message: string) {
    return new AppError(message, 400)
  }

  static notFound(message: string) {
    return new AppError(message, 404)
  }
}
