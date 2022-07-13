class AppError {
	constructor(readonly message: string, readonly statusCode: number = 400) {}
}

export { AppError };
