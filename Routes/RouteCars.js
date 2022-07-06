const express = require('express')
const router = express.Router()

const Controllers = require('../Controllers/ControllerCars')

router.get('/cars', Controllers.showCars)
router.post('/new-car', express.json(), Controllers.newCar)
router.delete('/del-car', express.json(), Controllers.deleteCar)
router.put('/edit-car', express.json(), Controllers.editCar)

module.exports = router