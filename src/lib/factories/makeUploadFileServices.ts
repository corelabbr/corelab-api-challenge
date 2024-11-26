import { PrismaFileRepository } from '@/repositories/prisma/prismaFileRepository'
import { UploadFileServices } from '../services/uploadFileServices'

export function makeUploadFileServices() {
    const fileRepository = new PrismaFileRepository()
    const service = new UploadFileServices(fileRepository)

    return service
}
