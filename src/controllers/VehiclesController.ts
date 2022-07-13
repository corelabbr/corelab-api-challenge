import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteVehicleUseCase } from "../useCases/deleteVehicle/DeleteVehicleUseCase";
import { GetVehicleUseCase } from "../useCases/getVehicle/GetVehicleUseCase";
import { IListVehiclesDTO } from "../useCases/listVehicles/IListVehiclesDTO";
import { ListVehiclesUseCase } from "../useCases/listVehicles/ListVehiclesUseCase";
import { UpdateFavoriteUseCase } from "../useCases/updateFavorite/UpdateFavoriteUseCase";
import { UpdateVehicleUseCase } from "../useCases/updateVehicle/UpdateVehicleUseCase";
import { CreateVehicleUseCase } from "../useCases/createVehicle/CreateVehicleUseCase";

class VehiclesController {
	async create(request: Request, response: Response): Promise<Response> {
		const { name, brand, description, plate, year, color, price } = request.body;

		const createVehicleUseCase = container.resolve(CreateVehicleUseCase);

		const vehicle = await createVehicleUseCase.execute({
			name,
			brand,
			description,
			plate,
			year,
			color,
			price,
		});

		return response.status(201).json(vehicle);
	}

	async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { name, brand, description, plate, year, color, price } = request.body;

		const updateVehicleUseCase = container.resolve(UpdateVehicleUseCase);

		const vehicle = await updateVehicleUseCase.execute({
			id,
			name,
			brand,
			description,
			plate,
			year,
			color,
			price,
		});

		return response.json(vehicle);
	}

	async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const deleteVehicleUseCase = container.resolve(DeleteVehicleUseCase);

		await deleteVehicleUseCase.execute(id);

		return response.send();
	}

	async get(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const getVehicleUseCase = container.resolve(GetVehicleUseCase);

		const vehicle = await getVehicleUseCase.execute(id);

		return response.json(vehicle);
	}

	async getAll(request: Request, response: Response): Promise<Response> {
		const { searchString, brand, color, year, maxPrice, minPrice } = request.query;

		const filterOptions: IListVehiclesDTO = {
			searchString: searchString ? (searchString as string) : "",
			brand: brand ? (brand as string) : "",
			color: color ? (color as string) : "",
			year: year ? Number(year) : 0,
			minPrice: minPrice ? Number(minPrice) : 0,
			maxPrice: maxPrice ? Number(maxPrice) : 0,
		};

		const listVehiclesUseCase = container.resolve(ListVehiclesUseCase);

		const vehicles = await listVehiclesUseCase.execute(filterOptions);

		return response.json(vehicles);
	}

	async toggleFavorite(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const updateFavoriteUseCase = container.resolve(UpdateFavoriteUseCase);

		await updateFavoriteUseCase.execute(id);

		return response.send();
	}
}

export { VehiclesController };
