import { z } from 'zod'
import { TaskDoesNotExistError } from '../services/errors/taskDoesNotExistError'
import { makeDeleteTaskServices } from '../factories/makeDeleteTaskServices'
import { Request, Response } from 'express'

export async function deleteTaskController(req: Request, res: Response) {
    const bodySchema = z.object({
        id: z.string()
    })

    const { id } = bodySchema.parse(req.body)

    try {
        const deleteTaskServices = makeDeleteTaskServices()

        await deleteTaskServices.execute({
            id
        })

        return res.status(200).send({
            message: 'Task deleted'
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
