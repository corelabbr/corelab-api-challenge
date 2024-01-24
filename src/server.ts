import express from "express";
import cors from "cors"
import NoteController from "./adapters/NoteController/NoteController";
import NoteService from "./core/notes/service/NoteService";
import NoteRepositoryPrismaPg from "./external/prisma/NoteRepositoryPrismaPg";
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

const noteRepositoryPrismaPg = new NoteRepositoryPrismaPg();
const note = new NoteService(noteRepositoryPrismaPg);
new NoteController(app, note);

app.listen(PORT, () => console.log(`app runnning on port ${PORT}`));

export default app;