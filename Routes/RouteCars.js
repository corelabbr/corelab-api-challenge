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
router.post('/new-car', express.urlencoded(), Controllers.newCar)


// ----------------DEL---------------- //
router.delete('/del-car', express.json(), Controllers.deleteCar)


// ----------------EDIT---------------- //
router.post('/edit-car', express.urlencoded(), Controllers.editCar)
router.post('/favorite', express.json(), Controllers.Favorite)


module.exports = router