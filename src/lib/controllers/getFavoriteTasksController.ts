import { makeGetFavoriteTasksServices } from '../factories/makeGetFavoriteTasksServices'
import { Request, Response } from 'express'

export async function getFavoriteTasksController(req: Request, res: Response) {
    try {
        const getFavoriteTasksServices = makeGetFavoriteTasksServices()

        const tasks = await getFavoriteTasksServices.execute()

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
