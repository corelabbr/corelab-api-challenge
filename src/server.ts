import Express from "express";
import NoteController from "./adapters/NoteController/NoteController";
import NoteService from "./core/notes/service/NoteService";
import NoteRepositoryPrismaPg from "./external/prisma/NoteRepositoryPrismaPg"
const app = Express();
app.use(Express.json());

const PORT = 3000;

const noteRepositoryPrismaPg = new NoteRepositoryPrismaPg();
const note = new NoteService(noteRepositoryPrismaPg);
new NoteController(app, note);

app.listen(PORT, () => console.log(`app runnning on port ${PORT}`));