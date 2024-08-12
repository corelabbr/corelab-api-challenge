export default class ApiError extends Error {
  constructor(readonly statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}