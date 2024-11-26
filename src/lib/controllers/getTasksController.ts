import { makeGetTasksServices } from '../factories/makeGetTasksServices'
import { Request, Response } from 'express'

export async function getTasksController(req: Request, res: Response) {
    try {
        const getTasksServices = makeGetTasksServices()

        const tasks = await getTasksServices.execute()

        return res.status(200).send({
            ...tasks
        })
    } catch (err) {
        if(err instanceof Error) {
            return res.status(404).send({
                message: err.message
            })
        }

        throw err
    }
}
