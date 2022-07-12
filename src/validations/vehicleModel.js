const yup = require('./yup')
const { object } = require('yup')

const VehicleSchema = yup.object().shape({
  name: yup.string().max(40).trim().required(),
  brand: yup.string().max(20).trim().required(),
  color: yup.string().max(10).trim().required(),
  year: yup.number().min(1900).required(),
  plate: yup.string().max(7).trim(),
  price: yup.number().min(3),
  favorite: yup.boolean(),
  createAt: yup.date(),
})

const updateShcema = yup.object().shape({
  name: yup.string().max(40).trim(),
  brand: yup.string().max(20).trim(),
  color: yup.string().max(10).trim(),
  year: yup.number(),
  plate: yup.string().max(7).trim(),
  price: yup.number().min(3),
  favorite: yup.boolean(),
  createAt: yup.date(),
})

module.exports = { VehicleSchema, updateShcema }
