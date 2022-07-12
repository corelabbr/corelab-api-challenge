import {model, Schema, Document } from 'mongoose';
import { IVehicle } from '../Interface/IVehicle';


interface VehicleModel extends IVehicle , Document {}

const VehicleSchema = new Schema<VehicleModel>({
    name:{ 
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    plate: {
        type: String,
        required: true
    },
    isFavorite: {
        type: Boolean,
        required: false
    },
    year: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }

})

export default model<VehicleModel>('Vehicle', VehicleSchema);