import chalk from "chalk";
import postgres from "postgres";

import { env } from "@/env";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

async function main() {
	const connection = postgres(
		env.DB_URL || "postgresql://docker:docker@localhost:5432/core_notes ",
		{ max: 1 }
	);
	const db = drizzle(connection);

	await migrate(db, { migrationsFolder: "drizzle" });

	console.log(chalk.greenBright("Migrations applied successfully!"));

	await connection.end();

	process.exit();
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
