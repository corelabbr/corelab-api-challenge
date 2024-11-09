import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { findByFavoriteNotesService } from '../services/FindByFavoriteNotesService'

class FindByFavoriteNotesController {
    async findByFavorite(req: Request, res: Response, next: NextFunction) {
        try {
            const favorite = req.params.favorite === 'true'
            const notes = await findByFavoriteNotesService.findByFavorite(favorite)
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

const findByFavoriteNotesController = new FindByFavoriteNotesController()

export { findByFavoriteNotesController }
