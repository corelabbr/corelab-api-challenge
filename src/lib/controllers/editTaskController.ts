import { z } from 'zod'
import { makeEditTaskServices } from '../factories/makeEditTaskServices'
import { TaskDoesNotExistError } from '../services/errors/taskDoesNotExistError'
import { MissingFieldsError } from '../services/errors/missingFieldsError'
import { InvalidColorError } from '../services/errors/invalidColorError'
import { Request, Response } from 'express'

export async function editTaskController(req: Request, res: Response) {
    const bodySchema = z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
        color: z.string()
    })

    const { id, title, content, color } = bodySchema.parse(req.body)

    try {
        const editTaskServices = makeEditTaskServices()

        await editTaskServices.execute({
            id,
            title,
            content,
            color
        })

        return res.status(202).send({
            message: 'Task edited'
        })
    } catch (err) {
        if(err instanceof TaskDoesNotExistError) {
            return res.status(404).send({
                message: err.message
            })
        }

        if(err instanceof MissingFieldsError) {
            return res.status(400).send({
                message: err.message
            })
        }

        if(err instanceof InvalidColorError) {
            return res.status(400).send({
                message: err.message
            })
        }

        throw err
    }
}
