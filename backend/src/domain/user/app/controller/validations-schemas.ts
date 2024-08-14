import { z } from "zod";

export const GetUserSchema = z.object({
	id: z.string().uuid().optional(),
	sessionId: z.string().optional()
});
