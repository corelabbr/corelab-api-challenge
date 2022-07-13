import { inject, injectable } from "tsyringe";

import { IVehicle } from "../../entities/IVehicle";
import { IVehiclesRepository } from "../../repositories/IVehiclesRepository";
import { AppError } from "../../shared/errors/AppError";
import { ICreateVehicleDTO } from "./ICreateVehicleDTO";

@injectable()
class CreateVehicleUseCase {
	constructor(
		@inject("VehiclesRepository")
		private vehiclesRepository: IVehiclesRepository
	) {}

	async execute(data: ICreateVehicleDTO): Promise<IVehicle> {
		const existingVehicle = await this.vehiclesRepository.findByPlate(data.plate);

		if (existingVehicle) {
			throw new AppError("Vehicle already exists!");
		}

		const vehicle = await this.vehiclesRepository.create(data);

		return vehicle;
	}
}

export { CreateVehicleUseCase };
