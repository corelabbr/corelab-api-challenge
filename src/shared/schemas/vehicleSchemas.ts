import * as yup from "yup";

export const createVehicleSchema = yup.object().shape({
	body: yup.object({
		name: yup.string().required(),
		brand: yup.string().required(),
		description: yup.string().required(),
		color: yup.string().required(),
		plate: yup.string().required(),
		year: yup.number().required(),
		price: yup.number().required(),
	}),
});

export const updateVehicleSchema = yup.object().shape({
	body: yup.object({
		name: yup.string().required(),
		brand: yup.string().required(),
		description: yup.string().required(),
		color: yup.string().required(),
		plate: yup.string().required(),
		year: yup.number().required(),
		price: yup.number().required(),
	}),
});
