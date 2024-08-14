import { UseCaseError } from "@/core/errors/use-case-error";

export class AlreadyExistsError extends Error implements UseCaseError {
	constructor(message: string) {
		super(message);
	}
}
