import express from "express";
import { config } from "dotenv";
import Router from "./Router";  

config();

export const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors())
app.use("/", Router);