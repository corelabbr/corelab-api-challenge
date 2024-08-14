import { Entity } from "@/core/entity";

export interface UserProps {
	session_id: string;
}

export class User extends Entity<UserProps> {
	public get session_id(): string {
		return this.props.session_id;
	}
	public static create(props: UserProps, id?: string): User {
		return new User(props, id);
	}
}
