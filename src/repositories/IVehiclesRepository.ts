import { IVehicle } from "../entities/IVehicle";
import { ICreateVehicleDTO } from "../useCases/createVehicle/ICreateVehicleDTO";
import { IListVehiclesDTO } from "../useCases/listVehicles/IListVehiclesDTO";
import { IUpdateVehicleDTO } from "../useCases/updateVehicle/IUpdateVehicleDTO";

export interface IVehiclesRepository {
	create: (data: ICreateVehicleDTO) => Promise<IVehicle>;
	findById: (id: string) => Promise<IVehicle>;
	findByPlate: (plate: string) => Promise<IVehicle>;
	list: (filterOptions?: IListVehiclesDTO) => Promise<IVehicle[]>;
	delete: (id: string) => Promise<void>;
	update: (data: IUpdateVehicleDTO) => Promise<IVehicle>;
	updateFavorite: (id: string) => Promise<void>;
}
