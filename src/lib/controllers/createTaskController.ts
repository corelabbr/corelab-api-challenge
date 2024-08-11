import { z } from 'zod'
import { makeCreateTaskServices } from '../factories/makeCreateTaskServices'
import { Request, Response } from 'express'

export async function createTaskController(req: Request, res: Response) {
    const bodySchema = z.object({
        title: z.string(),
        content: z.string(),
        color: z.string().default('#D9D9D9')
    })

    const { title, content, color } = bodySchema.parse(req.body)

    try {
        const createTaskServices = makeCreateTaskServices()

        await createTaskServices.execute({
            title,
            content,
            color
        })

        return res.status(201).send({
            message: 'Task Created'
        })
    } catch (err) {
        if(err instanceof Error) {
            return res.status(400).send({
                message: err.message
            })
        }

        throw err
    }
}
