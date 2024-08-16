import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { deleteNotesService } from '../services/DeleteNotesService'
import { findByIdNotesService } from '../services/FindByIdNotesService'

class DeleteNotesController {
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const existId = await findByIdNotesService.findById(id)

            if (!existId) {
                res.status(StatusCodes.NOT_FOUND).format({
                    'application/json': () => {
                        res.send({ error: 'Notes not found!' })
                    }
                })
                return
            }

            await deleteNotesService.delete(id)
            res.status(StatusCodes.NO_CONTENT).format({
                'application/json': () => { res.send() }
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

const deleteNotesController = new DeleteNotesController()

export { deleteNotesController }