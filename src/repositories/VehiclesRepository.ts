import { Repository } from "typeorm";

import { dataSource } from "../database/dataSource";
import { IVehicle } from "../entities/IVehicle";
import { Vehicle } from "../entities/Vehicle";
import { ICreateVehicleDTO } from "../useCases/createVehicle/ICreateVehicleDTO";
import { IListVehiclesDTO } from "../useCases/listVehicles/IListVehiclesDTO";
import { IUpdateVehicleDTO } from "../useCases/updateVehicle/IUpdateVehicleDTO";
import { IVehiclesRepository } from "./IVehiclesRepository";

class VehiclesRepository implements IVehiclesRepository {
	private repository: Repository<Vehicle>;

	constructor() {
		this.repository = dataSource.getRepository(Vehicle);
	}

	async create(data: ICreateVehicleDTO): Promise<IVehicle> {
		const vehicle = await this.repository.create(data);

		return this.repository.save(vehicle);
	}

	async findById(id: string): Promise<IVehicle> {
		const vehicle = await this.repository.findOneBy({ id });

		return vehicle;
	}

	async findByPlate(plate: string): Promise<IVehicle> {
		const vehicle = await this.repository.findOneBy({ plate });

		return vehicle;
	}

	async list(filterOptions?: IListVehiclesDTO): Promise<IVehicle[]> {
		const listQuery = this.repository.createQueryBuilder("vehicle");

		if (filterOptions.brand) {
			listQuery.andWhere("vehicle.brand = :brand", { brand: filterOptions.brand });
		}

		if (filterOptions.color) {
			listQuery.andWhere("vehicle.color = :color", { color: filterOptions.color });
		}

		if (filterOptions.year) {
			listQuery.andWhere("vehicle.year = :year", { year: filterOptions.year });
		}

		if (filterOptions.minPrice) {
			listQuery.andWhere("vehicle.price >= :minPrice", {
				minPrice: filterOptions.minPrice,
			});
		}

		if (filterOptions.maxPrice) {
			listQuery.andWhere("vehicle.price <= :maxPrice", {
				maxPrice: filterOptions.maxPrice,
			});
		}

		if (filterOptions.searchString) {
			listQuery.andWhere(
				"vehicle.name ilike :search" +
					" OR vehicle.description ilike :search" +
					" OR vehicle.brand ilike :search" +
					" OR vehicle.plate ilike :search" +
					" OR vehicle.color ilike :search" +
					" OR cast(vehicle.year as varchar) ilike :search" +
					" OR cast(vehicle.price as varchar) ilike :search",
				{
					search: `%${filterOptions.searchString}%`,
				}
			);
		}

		return listQuery.getMany();
	}

	async delete(id: string): Promise<void> {
		await this.repository.delete({ id });
	}

	async update(data: IUpdateVehicleDTO): Promise<IVehicle> {
		await this.repository.update({ id: data.id }, { ...data });

		const vehicle = await this.repository.findOneBy({ id: data.id });

		return vehicle;
	}

	async updateFavorite(id: string): Promise<void> {
		const vehicle = await this.repository.findOneBy({ id });

		await this.repository.update(id, { isFavorite: !vehicle.isFavorite });
	}
}

export { VehiclesRepository };
