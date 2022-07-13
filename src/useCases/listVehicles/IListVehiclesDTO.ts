export interface IListVehiclesDTO {
	searchString: string;
	brand?: string;
	color?: string;
	year?: number;
	minPrice?: number;
	maxPrice?: number;
}
