import { DataSource } from "typeorm";
import { Vehicle } from "../entities/Vehicle";
import { CreateVehicles1657668707904 } from "./migrations/1657668707904-CreateVehicles";

// use the name of the docker database container as host
const dataSource = new DataSource({
	type: "postgres",
	host: "corelab_challenge_database",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "corelab_challenge_database",
	migrations: [CreateVehicles1657668707904],
	entities: [Vehicle],
});

dataSource
	.initialize()
	.then(() => {
		console.log("Data Source has been initialized!");
	})
	.catch((err) => {
		console.error("Error during Data Source initialization", err);
	});

export { dataSource };
