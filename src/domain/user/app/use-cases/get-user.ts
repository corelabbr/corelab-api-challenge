import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/not_found";
import { UserRepository } from "../repository/user-repository";
import { User } from "@/domain/user/entities/user";

interface GetUserDTO {
	id?: string;
	sessionId?: string;
}

type GetUserResponse = Promise<Either<ResourceNotFoundError, User>>;

export class GetUser {
	constructor(private userRepository: UserRepository) {}

	async execute({ id, sessionId }: GetUserDTO): GetUserResponse {
		const identifier = id || sessionId;
		if (!identifier) {
			return left(new ResourceNotFoundError("User not found"));
		}
		const user = id
			? await this.userRepository.findById(identifier)
			: await this.userRepository.findBySessionId(identifier);
		if (!user) {
			return left(new ResourceNotFoundError("User not found"));
		}
		return right(user);
	}
}
