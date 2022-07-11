import express, { Express, Request, Response } from "express"
import cors from "cors";

import VC from "./api/controllers/VehiclesController"

const app: Express = express()
const PORT = 3333
app.use(cors())
app.use(express.json())
app.use("/v", VC)
app.get("/", (req: Request, res: Response) => {
    res.send("Express + TS")
})

app.listen(PORT, () => {
    console.log("Server ON!")
})