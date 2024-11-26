import { z } from 'zod'
import { makeSetFavoriteTaskServices } from '../factories/makeSetFavoriteTaskServices'
import { TaskDoesNotExistError } from '../services/errors/taskDoesNotExistError'
import { Request, Response } from 'express'

export async function setFavoriteTaskController(req: Request, res: Response) {
    const bodySchema = z.object({
        id: z.string(),
        favorite: z.boolean()
    })

    const { id, favorite } = bodySchema.parse(req.body)

    try {
        const setFavoriteTaskServices = makeSetFavoriteTaskServices()

        await setFavoriteTaskServices.execute({
            id,
            favorite
        })

        return res.status(202).send({
            message: 'Task updated'
        })
    } catch (err) {
        if(err instanceof TaskDoesNotExistError) {
            return res.status(404).send({
                message: err.message
            })
        }

        throw err
    }
}
