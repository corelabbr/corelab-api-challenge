import { z } from 'zod'
import { Request, Response } from 'express'
import { makeUploadFileServices } from '../factories/makeUploadFileServices'
import { TaskAlreadyHaveFileError } from '../services/errors/taskAlreadyHaveFileError'

export async function uploadFileController(req: Request, res: Response) {
    const filename = req.file!.originalname

    const bodySchema = z.object({
        file_name: z.string(),
        task_id: z.string()
    })

    const { file_name, task_id } = bodySchema.parse(req.body)

    try {
        const uploadFileServices = makeUploadFileServices()

        await uploadFileServices.execute({
            file_name: filename,
            task_id
        })

        return res.status(200).send({
            message: 'File uploaded'
        })
    } catch (err) {
        if(err instanceof TaskAlreadyHaveFileError) {
            return res.status(409).send({
                message: err.message
            })
        }

        if(err instanceof Error) {
            return res.status(400).send({
                message: err.message
            })
        }

        throw err
    }
}
