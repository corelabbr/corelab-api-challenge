import { db } from "./drizzle";
import { note, user } from "./schemas";

export async function resetDatabase() {
	// Limpa dados das tabelas
	await db.delete(note).execute();
	await db.delete(user).execute();
}
