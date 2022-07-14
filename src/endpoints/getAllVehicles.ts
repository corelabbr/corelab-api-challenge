import express, { Express, Request, Response } from "express";
import { connection } from "../data/database"

export async function getAllVehicles (req: Request, res: Response ){
    try {

        const allVehicles = await connection("table_vehicles").select("*")
        res.status(201).send(allVehicles);


    } catch (error: any) {
        console.log(error);
        res.status(400).send(error.message);
    }
};