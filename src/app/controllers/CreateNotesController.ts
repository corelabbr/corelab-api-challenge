import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { INotes } from '../interfaces/INotes'
import { createNotesService } from '../services/CreateNotesService'

class CreateNotesController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, text, color, favorite }: INotes = req.body

            if (!text) {
                res.status(StatusCodes.UNPROCESSABLE_ENTITY).format({
                    "application/json": () => {
                        res.send({ error: 'Text required!' })
                    }
                })
            }

            const newNote: any = {
                title: title,
                text: text,
                color: color || 'white',
                favorite: favorite || false,
            } 
            
            await createNotesService.create(newNote)

            res.status(StatusCodes.CREATED).format({
                'application/json': () => {
                    res.send(newNote)
                }
            })
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).format({
                "application/json": () => {
                    res.send({ error: 'Internal server error!' })
                }
            })
            next(error)
        }
    } 
}

const createNotesController = new CreateNotesController()

export { createNotesController }