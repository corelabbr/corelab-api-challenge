import express, { Express, Request, Response } from "express";
import { connection } from "../data/database"



export async function  putVehicles  (req: Request, res: Response)  {
    let errorCode = 400
    try {
        const id = req.params.id
        const input = {
             name: req.body.name,
             brand: req.body.brand,
             color: req.body.color,
             price: req.body.price,
             year: req.body.year,
             license_plate: req.body.license_plate
        }
        await connection("table_vehicles").update(input).where({ id })


        res.status(200).send({ message: "Vehicles Create with sucess!" });
    } catch (error: any) {
        console.log(error);
        res.status(400).send(error.message);
    }
};