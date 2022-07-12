import { Router } from 'express';
import VehicleController from '../Controller/Vehicle';

const router = Router();

    router.post('/createVehicle', VehicleController.createVehicle);
    router.get('/listVehicle', VehicleController.listVehicle);
    router.get('/findVehicle/:id', VehicleController.findVehicle);
    router.put('/:id', VehicleController.editVehicle)
    router.put('/isfavorite/:id', VehicleController.isFavorite)
    router.delete('/:id', VehicleController.deleteVehicle)

export default router