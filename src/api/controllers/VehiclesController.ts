import { Router, Request, Response } from "express";
const router = Router()
import { createV, readV, updateV, deleteV, searchV, filtersV } from "../services/VehiclesService"
import { IVehicleInput } from "../../db/models/Vehicle"

router.post("/create", async (req: Request, res: Response) => {
    try {
        const payload: IVehicleInput = req.body
        const created = await createV(payload)
        res.json(created)
    } catch (error) {
        console.log("error")
        return false
    }
})

router.get("/read", async (req: Request, res: Response) => {
    try {
        const vehicles = await readV()
        res.json(vehicles)
    } catch (error) {
        return false
    }
})

router.put("/update/:id", async (req: Request<{ id: number }>, res: Response) => {
    try {
        const id = req.params.id
        const payload = req.body
        const updated = await updateV(id, payload)
        res.json(updated)
    } catch (error) {
        return false
    }
})

router.delete("/delete/:id", async (req: Request<{ id: number }>, res: Response) => {
    try {
        const id = req.params.id
        const deleted = await deleteV(id)
        return res.json(deleted)
    } catch (error) {
        return false
    }
})

router.get("/search/", async (req: Request, res: Response) => {
    try {
        const q = req.query
        const vehicles = await searchV(q)
        return res.json(vehicles)
    } catch (error) {
        return false
    }
})

router.get("/filters", async (req: Request, res: Response) => {
    try {
        const filters = await filtersV()
        return res.json(filters)
    } catch (error) {
        return false
    }
})

export default router