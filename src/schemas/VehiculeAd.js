import joi from "joi";

export const VehiculeAd = joi.object({
  userId: joi.object()
    .required(),
  name: joi.string()
    .required(),
  description: joi.string()
    .required(),
  brand: joi.string()
    .required(),
  color: joi.string()
    .required(),
  year: joi.number()
    .required(),
  licensePlate: joi.string()
    .required()
});