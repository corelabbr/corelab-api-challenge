import { Router } from 'express';
import { createVehicule, getVehicules } from '../controllers/vehiculeController';

const route = Router();

route.post('/vehicule', createVehicule);
route.post('/vehicule', getVehicules);

export default route;
