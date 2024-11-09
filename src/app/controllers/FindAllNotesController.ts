import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { findAllNotesService } from '../services/FindAllNotesService'

class FindAllNotesController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const notes = await findAllNotesService.findAll()
            res.status(StatusCodes.OK).format({
                'application/json': () => {
                    res.send(notes)
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

const findAllNotesController = new FindAllNotesController()

export { findAllNotesController }
