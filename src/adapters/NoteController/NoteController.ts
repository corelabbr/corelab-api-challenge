import { Express, Request, Response } from "express";
import NoteService from "../../core/notes/service/NoteService";
import { postValidation, putValidation } from "../../core/notes/middleware/validation";
import { validation } from "../../core/notes/middleware/validation";

export default class NoteController {
    constructor(
        readonly server: Express,
        readonly useCase: NoteService
    ) {
        server.get('/notes', async (req: Request, res: Response) => {
            const response = await useCase.get();

            return res.status(response.code).json(response);
        });

        server.get('/note/:id', async (req: Request, res: Response) => {

            const response = await useCase.getById(Number(req.params.id));

            return res.status(response.code).json(response);
        });

        server.get('/note/color/:color', async (req: Request, res: Response) => {

            const response = await useCase.getByColor(req.params.color);

            return res.status(response.code).json(response);
        });

        server.post('/notes', validation(postValidation), async (req: Request, res: Response) => {

            const { title, desc, color, favorite } = req.body;
            const response = await useCase.post({ title, desc, color, favorite });

            return res.status(response.code).json(response);
        });

        server.put('/note/:id', validation(putValidation), async (req: Request, res: Response) => {

            const { title, desc, color, favorite } = req.body;
            const { id } = req.params;
            const response = await useCase.put(Number(id), { title, desc, color, favorite });

            return res.status(response.code).json(response);
        });

        server.delete('/note/:id', async (req: Request, res: Response) => {

            const { id } = req.params;
            const response = await useCase.delete(Number(id));

            return res.status(response.code).json(response);
        })
    }
}