
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VehicleDocument = Vehicle & Document;

@Schema() //Schema para que o Mongoose consiga mapear a classe no MongoDB;
export class Vehicle {
    @Prop({required: true}) 
    name: string;

    @Prop({required: true})
    brand: string;

    @Prop({required: true})
    color: string; 

    @Prop({required: true}) 
    year: string;

    @Prop({required: true})
    plate: string; 

    @Prop({required: true})
    isFavorite: boolean; 

    @Prop({required: true}) 
    price: string;

    @Prop({required: true}) 
    description: string;
}


export const VehicleSchema = SchemaFactory.createForClass(Vehicle)
