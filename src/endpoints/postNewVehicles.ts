import { uuid } from 'uuidv4';
import { vehicles, vehiclesInputDTO } from "../types/types";
import express, { Express, Request, Response } from "express";
import {connection} from "../data/database"

export async function  postNewVehicles  (req: Request, res: Response)  {
    let errorCode = 400
    try {
        const input: vehiclesInputDTO = {
            name: req.body.name,
            brand: req.body.brand,
            color: req.body.color,
            price: req.body.price,
            year: req.body.year,
            license_plate: req.body.license_plate
        }

        if (!input.name || !input.brand || !input.color || !input.price || !input.year || !input.license_plate) {
            errorCode = 422;
            throw new Error("Fill in the fields correctly")
        }

        const newVehicles: vehicles = {
            id: uuid(),
            name: input.name,
            brand: input.brand,
            color: input.color,
            price: input.price,
            year: input.year,
            license_plate: input.license_plate

        }
        await connection("table_vehicles").insert(newVehicles)


        res.status(201).send({ message: "Vehicles Create with sucess!" });
    } catch (error: any) {
        console.log(error);
        res.status(400).send(error.message);
    }
};