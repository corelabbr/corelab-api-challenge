import { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/errors/AppError";
import { SchemaOf, ValidationError } from "yup";

export function validateRequestBody(schema: any) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validate({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			return next();
		} catch (error) {
			if (error instanceof ValidationError) {
				const errorsArray = error.errors;

				const errorsObject = Object.assign({}, errorsArray);

				throw new AppError(JSON.stringify(errorsObject));
			}

			throw new AppError("Bad Request");
		}
	};
}
