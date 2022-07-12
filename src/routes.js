import { Router } from 'express';

import VehicleController from './controllers/VehicleController';

const router = Router();

router.post("/add", VehicleController.createVehicle);
router.get("/vehicles", VehicleController.getAllVehicles);
router.get("/vehicle/:id", VehicleController.getVehicle);
router.put("/vehicle/:id", VehicleController.updateVehicle);
router.delete("/vehicle/:id", VehicleController.deleteVehicle);

export { router };