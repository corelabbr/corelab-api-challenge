import * as dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
	DB_URL: z.string().url().min(1).optional()
});

export const env = envSchema.parse(process.env);
