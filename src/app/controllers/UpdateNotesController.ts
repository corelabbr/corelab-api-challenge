import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { INotes } from '../interfaces/INotes'
import { updateNotesService } from '../services/UpdateNotesService'

class UpdateNotesController {
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const { title, text, color, favorite }: INotes = req.body

            if (!id || (!title && !text && !color && !favorite)) {
                res.status(StatusCodes.UNPROCESSABLE_ENTITY).format({
                    "application/json": () => {
                        res.send({ error: 'Id and at least one field to update are required!' })
                    }
                })
                return next()
            }

            const updatedData: any = {}
            if (title || title?.length === 0) updatedData.title = title
            if (text) updatedData.text = text
            if (color) updatedData.color = color
            if (favorite == true || favorite == false) updatedData.favorite = favorite

            const updatedNotes = await updateNotesService.update(id, updatedData)

            if (!updatedNotes) {
                res.status(StatusCodes.NOT_FOUND).format({
                    "application/json": () => {
                        res.send({ error: 'Notes not found!' })
                    }
                })
                return next()
            }

            res.status(StatusCodes.OK).format({
                'application/json': () => {
                    res.send(updatedNotes)
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

const updateNotesController = new UpdateNotesController()

export { updateNotesController }
