import { IVehicle } from "./IVehicle";
import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("vehicles")
class Vehicle implements IVehicle {
	@PrimaryColumn()
	id: string;

	@Column()
	name: string;

	@Column()
	brand: string;

	@Column()
	description: string;

	@Column()
	plate: string;

	@Column()
	isFavorite: boolean;

	@Column()
	year: number;

	@Column()
	color: string;

	@Column()
	price: number;

	@CreateDateColumn()
	createdAt: Date;

	constructor() {
		if (!this.id) {
			this.id = uuidV4();
		}
	}
}

export { Vehicle };
