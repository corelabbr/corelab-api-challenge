const mongoose = require('mongoose')

const CarModel = mongoose.Schema({
    name : { type : String },
    brand : { type : String },
    color : { type : String },
    year : { type : Number },
    board : { type : String },
    price : { type : Number },
    isFavorite : { type : Boolean, default : false }
})

module.exports = mongoose.model('CarModel', CarModel)