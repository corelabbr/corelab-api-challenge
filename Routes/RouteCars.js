const express = require('express')
const router = express.Router()

const Controllers = require('../Controllers/ControllerCars')

// ----------------GET---------------- //
router.get('/cars', Controllers.showCars)


// ----------------POST---------------- //
router.post('/new-car', express.json(), Controllers.newCar)


// ----------------DEL---------------- //
router.delete('/del-car', express.json(), Controllers.deleteCar)


// ----------------PUT---------------- //
router.put('/edit-car', express.json(), Controllers.editCar)


module.exports = router