import { UserRepository } from "@/domain/user/app/repository/user-repository";
import { User } from "@/domain/user/entities/user";

export class FakeUserRepository implements UserRepository {
	users: User[] = [];
	async save(user: User): Promise<void> {
		this.users.push(user);
	}
	async findById(id: string): Promise<User | null> {
		return Promise.resolve(this.users.find((user) => user.id === id) || null);
	}
	async findBySessionId(sessionId: string): Promise<User | null> {
		return Promise.resolve(
			this.users.find((user) => user.session_id === sessionId) || null
		);
	}
}

