import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
	schema: "./src/db/schemas.ts",
	out: "./drizzle",
	dbCredentials: {
		url: env.DB_URL || "postgresql://docker:docker@localhost:5432/core_notes"
	}
});
