const express = require('express')
const router = express.Router()
const cors = require('cors')

const Controllers = require('../Controllers/ControllerCars')

const config = {
    origin : 'http://localhost:3001'
}

router.use(cors(config))

// ----------------GET---------------- //
router.get('/cars', Controllers.showCars)


// ----------------POST---------------- //
router.post('/new-car', express.json(), Controllers.newCar)


// ----------------DEL---------------- //
router.delete('/del-car', express.json(), Controllers.deleteCar)


// ----------------PUT---------------- //
router.put('/edit-car', express.json(), Controllers.editCar)


module.exports = router