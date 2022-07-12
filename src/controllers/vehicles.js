const { vehicleSchema, updateShcema } = require('../validations/vehicleModel')
const { messages, errors } = require('../validations/messages')
const knex = require('../utils/conection')

const newVehicle = async (req, res) => {
  const { name, brand, color, year, plate } = req.body

  try {
    //await vehicleSchema.validate(req.body)

    const newVehicle = await knex('vehicle').insert({
      name,
      brand,
      color,
      year,
      plate,
    })

    if (!newVehicle) {
      return res.status(400).json(errors.unregisteredVehicle)
    }

    return res.status(200).json(messages.vehicleSuccess)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const updateVehicle = async (req, res) => {
  const { id } = req.params
  const { name, brand, color, year, plate, price, favorite, createdAt, description } = req.body

  try {
    await updateShcema.validate(req.body)

    const updateVehicle = await knex('vehicle').where('id', id).update({
      name,
      brand,
      color,
      year,
      plate,
      price,
      favorite,
      createdAt,
      description,
    })

    if (!updateVehicle) {
      return res.status(400).json(errors.unUpdateVehicle)
    }

    return res.status(200).json(messages.updatedVehicleSuccess)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const deleteVehicle = async (req, res) => {
  const { id } = req.params
  try {
    const deleteVehicle = await knex('vehicle').where('id', id).del()

    if (!deleteVehicle) {
      return res.status(400).json(errors.unDeleteVehicle)
    }

    return res.status(200).json(messages.deletedVehicleSuccess)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await knex('vehicle').select('*')

    if (!vehicles) {
      return res.status(400).json(errors.anyVehicle)
    }

    return res.status(200).json(vehicles)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getOneVehicle = async (req, res) => {
  const { id } = req.params
  try {
    const vehicle = await knex('vehicle').where('id', id)

    if (!vehicle) {
      return res.status(400).json(errors.invalidVehicle)
    }

    return res.status(200).json(vehicle)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

module.exports = {
  newVehicle,
  updateVehicle,
  deleteVehicle,
  getAllVehicles,
  getOneVehicle,
}
