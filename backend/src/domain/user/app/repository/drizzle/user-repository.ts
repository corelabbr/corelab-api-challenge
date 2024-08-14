import { User } from "@/domain/user/entities/user";
import { UserRepository } from "../user-repository";
import { db } from "@/db/drizzle";
import { user } from "@/db/schemas";
import { eq } from "drizzle-orm";

export class DrizzleUserRepository implements UserRepository {
	async save(object: User): Promise<void> {
		await db
			.insert(user)
			.values({
				id: object.id,
				session_id: object.session_id,
				created_at: new Date()
			})
			.execute();
	}
	async findById(id: string): Promise<User | null> {
		const result = await db
			.select()
			.from(user)
			.where(eq(user.id, id))
			.limit(1)
			.execute();
		return result.length > 0
			? User.create(
					{
						session_id: result[0].session_id
					},
					result[0].id
				)
			: null;
	}
	async findBySessionId(session_id: string): Promise<User | null> {
		const result = await db
			.select()
			.from(user)
			.where(eq(user.session_id, session_id))
			.limit(1)
			.execute();
		return result.length > 0
			? User.create(
					{
						session_id: result[0].session_id
					},
					result[0].id
				)
			: null;
	}
}
