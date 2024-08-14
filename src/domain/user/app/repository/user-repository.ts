import { User } from "@/domain/user/entities/user";

export interface UserRepository {
	save(user: User): Promise<void>;
	findById(id: string): Promise<User | null>;
	findBySessionId(session_id: string): Promise<User | null>;
}
