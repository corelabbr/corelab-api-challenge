import { createTaskController } from '@/lib/controllers/createTaskController'
import { deleteTaskController } from '@/lib/controllers/deleteTaskController'
import { editTaskController } from '@/lib/controllers/editTaskController'
import { getFavoriteTasksController } from '@/lib/controllers/getFavoriteTasksController'
import { getTasksController } from '@/lib/controllers/getTasksController'
import { setFavoriteTaskController } from '@/lib/controllers/setFavoriteTaskController'
import { uploadFileController } from '@/lib/controllers/uploadFileController'
import { Request, Response, Router } from 'express'
import multer from 'multer'

export const routes = Router()

    const storage = multer.diskStorage({
        destination: (req: Request, res: Response, cb) => {
            cb(null, 'public/file')
        },
        filename: (req: Request, file, cb) => {
            cb(null, file.originalname)
        }
    })

    const upload = multer({ storage })

    routes.post('/task', createTaskController)
    routes.post('/file', upload.single('file'), uploadFileController)

    routes.get('/task', getTasksController)
    routes.get('/task/favorite', getFavoriteTasksController)

    routes.put('/task/edit', editTaskController)
    routes.put('/task/favorite', setFavoriteTaskController)

    routes.delete('/task', deleteTaskController)
