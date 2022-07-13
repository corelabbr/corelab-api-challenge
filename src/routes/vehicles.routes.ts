import { Router } from "express";

import { validateRequestBody } from "../middlewares/validateRequest";
import {
	createVehicleSchema,
	updateVehicleSchema,
} from "../shared/schemas/vehicleSchemas";
import { VehiclesController } from "../controllers/VehiclesController";

const vehiclesRouter = Router();

const vehiclesController = new VehiclesController();

vehiclesRouter.post(
	"/",
	validateRequestBody(createVehicleSchema),
	vehiclesController.create
);
vehiclesRouter.get("/", vehiclesController.getAll);
vehiclesRouter.get("/:id", vehiclesController.get);
vehiclesRouter.put(
	"/:id",
	validateRequestBody(updateVehicleSchema),
	vehiclesController.update
);
vehiclesRouter.patch("/:id", vehiclesController.toggleFavorite);
vehiclesRouter.delete("/:id", vehiclesController.delete);

export { vehiclesRouter };
