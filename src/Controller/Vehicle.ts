import {  Request, Response  } from 'express';
import Vehicle from '../Models/Vehicle';

class VehicleController {

    public async createVehicle(req: Request, res:Response):Promise<Response>{

            const {  
                name, 
                description, 
                plate, 
                isFavorite, 
                year, 
                color,
                price
            } = req.body
        

        const vehicle = await Vehicle
        .create({               
             name, 
            description, 
            plate, 
            isFavorite, 
            year, 
            color,
            price
        })
        return res.status(200).json({message: 'vehicle created', vehicle})

    }

    public async listVehicle(req: Request, res:Response):Promise<Response>{
        const { q } = req.query
        
        if(!q){
            const vehicles = await Vehicle.find({raw:true});
            return res.status(200)
            .json(vehicles);
        }

        const search = [
        {name: {$regex: `${q}`, $options: 'i'} }, 
        {description: {$regex: `${q}`, $options: 'i'} },
        {plate: {$regex: `${q}`, $options: 'i'} },
        {color: {$regex: `${q}`, $options: 'i'} },

    ]

        const queryVehicles = await Vehicle.find({ $or: search})
        if(queryVehicles == []){
            return res.status(400).json({message: " value not found "});
        }

        return res.status(200).json(queryVehicles);

    }

    public async findVehicle(req: Request, res: Response):Promise<Response>{

        const { id } = req.params

        const vehicle = await Vehicle.findById(id)

        if(!vehicle){
            return res.status(400).json({message: "vehicle not found"})
        }
        

        console.log(vehicle)
        
        return res.status(200).json([vehicle])

    }

    public async editVehicle(req: Request, res:Response):Promise<Response>{

        const {                
            name, 
            description, 
            plate, 
            isFavorite, 
            year, 
            color,
            price
        } = req.body;


        const {id} = req.params;

        await Vehicle.findByIdAndUpdate(id, 
            {             
            name, 
            description, 
            plate, 
            isFavorite, 
            year, 
            color,
            price
         })

         return res.status(200).json({message: 'Vehicle updated successfully'}) 

    }

    public async deleteVehicle(req: Request, res:Response):Promise<Response>{
 
        const {  id } = req.params;

        await Vehicle.findByIdAndDelete(id)

        return res.status(200).json({message: 'deleted user'})

    }

    public async isFavorite(req: Request, res:Response):Promise<Response>{
        
        const { isFavorite } = req.body;
        const {id} = req.params;
        
        await Vehicle.findByIdAndUpdate(id, {isFavorite:isFavorite})

        return res.status(200).json({message: 'favorite vehicle'}) 

    }


}

export default new VehicleController();