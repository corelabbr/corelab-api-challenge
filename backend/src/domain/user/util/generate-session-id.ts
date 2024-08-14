// utils/sessionUtil.js
import crypto from "crypto";
export function generateSessionId(): string {
	return crypto.randomBytes(16).toString("hex"); // Generate a random 32 bytes hex string for session id
}
