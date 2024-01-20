import { Express, Request, Response } from "express";
import NoteService, {postValidation, putValidation} from "../../core/notes/service/NotesService";
import { validation } from "../../core/notes/middleware/validation";

export default class NoteController {
    constructor(
        readonly server: Express,
        readonly useCase: NoteService
    ){
        server.get('/notes', async (req: Request, res: Response) => {
            const response = await useCase.get();

            return res.status(response.code).json(response);
        });

        server.get('/note/:id', async (req: Request, res: Response) => {

            console.log(req.params.id)
            const response = await useCase.getById(Number(req.params.id));

            return res.status(response.code).json(response);
        });

        server.post('/notes', validation(postValidation), async (req: Request, res: Response) => {

            const { title, desc, color, favorite } = req.body;
            const response = await useCase.post({ title, desc, color, favorite });

            return res.status(response.code).json(response);
        });


    }
}