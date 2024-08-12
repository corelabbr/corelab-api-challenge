import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import notesRouter from "./routes/notes";

const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL!);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use("/notes", notesRouter);

app.listen(process.env.PORT, () => console.log(`Server running...`));
