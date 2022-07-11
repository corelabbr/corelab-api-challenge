import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Vehicle, VehicleDocument} from './entities/vehicle.entity';
import { UpdateVehicleDto}from './dto/update-vehicle.dto';

@Injectable()
export class VehicleRepository {
    constructor(
        @InjectModel(Vehicle.name) //usado para fazer a injeção de dependencias
        private vehicleModel: Model<VehicleDocument> // no caso esta injetando o UserDocument vindo do entitiy
    ) {}

    async create(vehicle: Vehicle): Promise<Vehicle>{
        const newVehicle = new this.vehicleModel(vehicle);
        return await newVehicle.save();
    }


    async findBySearch(search: string){
        if(search === 'all' || search === '') return this.vehicleModel.find()
     
        var word = search.toUpperCase();   
        
        return this.vehicleModel.find({
            $or: [
                {'name': word},
                {'brand': word},
                {'year': word},
                {'price': word},
                {'color': word},
                {'plate': word},
            ]
        })
    }

    async findByFilter(name: string, brand: string, year: string, color: string, minP: string, maxP: string){
       
       return this.vehicleModel.find({
            $and: [
                {'name': name},
                {'brand': brand},
                {'year': year},
                {'color': color},
                {'price': {$gt: minP}},
                {'price': {$lt: maxP}}
            ]
        })
    }


    async findOne(id: string){
        if(id === 'favorites'){
            return this.vehicleModel.find().where('isFavorite', true);
        }

        try{        
            return this.vehicleModel.find().where('_id', id);         
        }catch(err){
            return false;
        }    
    }

    
    async update(id: string, updateVehicle: UpdateVehicleDto): Promise<Vehicle>{
        return this.vehicleModel.findByIdAndUpdate(
            { _id: id, },
            { $set: updateVehicle, },
            { new: true, },
        )
        .exec()
    }

    async remove(id: string){
        return this.vehicleModel.deleteOne({_id: id}).exec();
    }
   
}