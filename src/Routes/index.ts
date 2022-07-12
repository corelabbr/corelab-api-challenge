const { Router } = require('express')
import vehicleRoutes from './vehicleRoutes';


const router = Router();

router.use(vehicleRoutes)

export default router