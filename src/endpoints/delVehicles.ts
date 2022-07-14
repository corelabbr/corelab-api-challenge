import express, { Express, Request, Response } from "express";
import { connection } from "../data/database"

export async function delVehicles(req: Request, res: Response) {
    try {
        const id = req.params.id
        await connection("table_vehicles").delete().where({ id })
        res.status(200).send({ message: "vehicle drop with suscess" });


    } catch (error: any) {
        console.log(error);
        res.status(400).send(error.message);
    }
};