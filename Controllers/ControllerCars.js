const CarModel = require('../Models/CarModels')

const Controllers = {

    showCars : async function(req, res){
        const cars = await CarModel.find()
        const allCars = cars.map((e)=>{
            return {
                name : e.name,
                brand : e .brand,
                color : e.color,
                year : e.year,
                board : e.board,
            }
        })

        
        res.status(200).send(allCars)
    },

    newCar : async function (req, res){
        
        const { name, brand, color, year, board } = await req.body
        const checkBoard = await CarModel.findOne({ board : board })
        
        console.log(checkBoard)

        if(checkBoard == null){
            const register = new CarModel({
                name : name,
                brand : brand,
                color : color,
                year : year,
                board : board
            })

             register.save()
             res.status(200).json({ message : 'O carro foi salvo' })
        }else{
            res.status(200)
            res.json({ message : 'A placa já está registrada' })
        }

    },

    deleteCar : function (req, res){

    },

    editCar : function (req, res){
        res.status(200)
    }

}

module.exports = Controllers