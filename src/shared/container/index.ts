import { InMemoryVehiclesRepository } from "../../repositories/InMemoryVehiclesRepository";
import { IVehiclesRepository } from "../../repositories/IVehiclesRepository";
import { container } from "tsyringe";
import { VehiclesRepository } from "../../repositories/VehiclesRepository";

container.registerSingleton<IVehiclesRepository>(
	"InMemoryVehiclesRepository",
	InMemoryVehiclesRepository
);

container.registerSingleton<IVehiclesRepository>(
	"VehiclesRepository",
	VehiclesRepository
);
