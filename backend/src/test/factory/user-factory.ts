import { User } from "@/domain/user/entities/user";
import { generateSessionId } from "@/domain/user/util/generate-session-id";

export function UserFactory() {
	return User.create({
		session_id: generateSessionId()
	});
}
