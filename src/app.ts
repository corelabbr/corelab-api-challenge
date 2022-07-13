import "reflect-metadata";
import "express-async-errors";
import "./shared/container";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import { vehiclesRouter } from "./routes/vehicles.routes";
import { AppError } from "./shared/errors/AppError";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/vehicles", vehiclesRouter);

app.use((error: Error, request: Request, response: Response, _next: NextFunction) => {
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({
			error: error.message,
		});
	}

	console.log(error);

	return response.status(500).json({
		error: `Internal Server Error - ${error.message}`,
	});
});

export { app };
