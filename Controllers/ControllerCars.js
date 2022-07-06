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

    deleteCar : async function (req, res){

        const board = await req.body.board
        await CarModel.findOneAndDelete({ board : board })

        res.status(200).json({ message : 'Carro deletado com sucesso' })
    },

    editCar : async function (req, res){

        const { name, brand, color, year, board } = await req.body

        const newData = {
            name : await name,
            brand : await brand,
            color : await color,
            year : await year,
            board : await board,
        }

        if(newData.name == undefined || !newData.name){
            delete newData.name
        }

        if(newData.brand == undefined || !newData.brand){
            delete newData.brand
        }

        if(newData.color == undefined || !newData.color){
            delete newData.color
        }

        if(newData.year == undefined || !newData.year){
            delete newData.year
        }

        if(newData.board == undefined || !newData.board){
            delete newData.board
        }

        const CarEdit = await CarModel.findOneAndUpdate({ board : board }, newData)
        res.json(CarEdit)
    }

}

module.exports = Controllers