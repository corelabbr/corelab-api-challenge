import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { INotes } from '../interfaces/INotes'
import { updateNotesValidation } from '../validations/UpdateNotesValidation'


class UpdateNotesValidationMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, text, color, favorite}: INotes = req.body

            const { error } = updateNotesValidation.validate({ title, text, color, favorite })
            if (error) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).format({
                    "application/json": () => {
                        res.send({ error: error.details[0].message })
                    }
                })
            }

            next()
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

const updateNotesValidationMiddleware = new UpdateNotesValidationMiddleware()

export { updateNotesValidationMiddleware }