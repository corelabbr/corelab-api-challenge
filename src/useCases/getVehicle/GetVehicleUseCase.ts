import { IVehiclesRepository } from "../../repositories/IVehiclesRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../shared/errors/AppError";
import { IVehicle } from "../../entities/IVehicle";

@injectable()
class GetVehicleUseCase {
	constructor(
		@inject("VehiclesRepository")
		private vehiclesRepository: IVehiclesRepository
	) {}

	async execute(id: string): Promise<IVehicle> {
		const vehicle = await this.vehiclesRepository.findById(id);

		if (!vehicle) {
			throw new AppError("Vehicle not found!", 404);
		}

		return vehicle;
	}
}

export { GetVehicleUseCase };
