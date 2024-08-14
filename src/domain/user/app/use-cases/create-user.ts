import { Either, right } from "@/core/either";
import { UserRepository } from "../repository/user-repository";
import { generateSessionId } from "../../util/generate-session-id";
import { User } from "../../entities/user";

type createUserReturn = Promise<Either<null, string>>;

export class CreateUser {
	constructor(private userRepository: UserRepository) {}

	public async execute(): createUserReturn {
		const session_id = generateSessionId();
		const user = User.create({ session_id });
		await this.userRepository.save(user);
		return right(user.session_id);
	}
}
