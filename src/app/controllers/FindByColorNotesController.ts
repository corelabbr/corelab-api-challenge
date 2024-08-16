import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { findByColorNotesService } from '../services/FindByColorNotesService'


class FindByColorNotesController {
    async findByColor(req: Request, res: Response, next: NextFunction) {
        try {
            const color: string = req.params.color
            const notes = await findByColorNotesService.findByColor(color)

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

const findByColorNotesController = new FindByColorNotesController()

export { findByColorNotesController }
