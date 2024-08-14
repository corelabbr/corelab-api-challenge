import { randomUUID } from "crypto";

export abstract class Entity<T> {
	private _id: string;
	protected _createdAt: Date;

	protected props: T;

	get id(): string {
		return this._id;
	}
	get createdAt(): Date {
		return this.createdAt;
	}
	protected constructor(props: T, id?: string) {
		this._id = id || randomUUID();
		this._createdAt = new Date();
		this.props = props;
	}
}
