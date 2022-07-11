const CarModel = require('../Models/CarModels')

const Controllers = {

    showCars : async function(req, res){

        const cars = await CarModel.find()
        
        const allCars = cars.map((e)=>{
            return {
                id : e._id,
                name : e.name,
                brand : e .brand,
                color : e.color,
                year : e.year,
                board : e.board,
                price : e.price,
                isFavorite : e.isFavorite
            }
        })

        res.status(200).send(allCars)
    },

    newCar : async function (req, res){
        
        const { name, brand, color, year, board, price, isFavorite } = await req.body
        const checkBoard = await CarModel.findOne({ board : board })

        if(checkBoard == null){

            const register = new CarModel({
                name : name,
                brand : brand,
                color : color,
                year : year,
                board : board,
                price : price,
                isFavorite : isFavorite
            })

             register.save()
             res.status(200)
        }else{
            res.status(200).json({ message : 'A placa já está registrada' })
        }
    },

    deleteCar : async function (req, res){

        const id = await req.body.id
        await CarModel.findOneAndRemove({ id : id })

        res.status(200).json({ message : 'Carro deletado com sucesso' })
    },

    editCar : async function (req, res){

        const { name, brand, color, year, board, price, id } = await req.body
        const findCar = await CarModel.findOne({ id : id })

        const newData = {
            name : await name,
            brand : await brand,
            color : await color,
            year : await year,
            board : await board,
            price : await price,
        }

        if(newData.name == undefined || !newData.name || ''){
            delete newData.name
        }

        if(newData.brand == undefined || !newData.brand || ''){
            delete newData.brand
        }

        if(newData.color == undefined || !newData.color || ''){
            delete newData.color
        }

        if(newData.year == undefined || !newData.year || ''){
            delete newData.year
        }

        if(newData.board == undefined || !newData.board ){
            delete newData.board
        }

        if(newData.price == undefined || !newData.price || ''){
            delete newData.price
        }

        await CarModel.findOneAndUpdate({ _id : findCar._id }, newData)
        res.status(200)
    },

    Favorite : async function(req, res) {
        const id = await req.body.id
        const findCar = await CarModel.findById({ _id : id })
       
        await CarModel.findByIdAndUpdate({ _id : id }, { isFavorite : !findCar.isFavorite })
        res.status(200).send('Atualizado com Sucesso')
    }

}

module.exports = Controllers