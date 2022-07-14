
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import { postNewVehicles } from "./endpoints/postNewVehicles";
import { putVehicles } from "./endpoints/putVehicles";
import { getAllVehicles } from "./endpoints/getAllVehicles";
import { delVehicles } from "./endpoints/delVehicles";


export const app: Express = express();
app.use(express.json());
app.use(cors());


app.post("/vehicles", postNewVehicles)
app.get("/allvehicles", getAllVehicles)
app.put("/editvehicles/:id", putVehicles)
app.delete("/deletevehicles/:id", delVehicles)


const server = app.listen(process.env.PORT || 3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});


