import { IVehiclesRepository } from "../../repositories/IVehiclesRepository";
import { AppError } from "../../shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUpdateVehicleDTO } from "./IUpdateVehicleDTO";
import { IVehicle } from "../../entities/IVehicle";

@injectable()
class UpdateVehicleUseCase {
	constructor(
		@inject("VehiclesRepository")
		private vehiclesRepository: IVehiclesRepository
	) {}

	async execute(data: IUpdateVehicleDTO): Promise<IVehicle> {
		const existingVehicle = await this.vehiclesRepository.findById(data.id);

		if (!existingVehicle) {
			throw new AppError("Vehicle not found!");
		}

		const updatedVehicle = await this.vehiclesRepository.update(data);

		return updatedVehicle;
	}
}

export { UpdateVehicleUseCase };
