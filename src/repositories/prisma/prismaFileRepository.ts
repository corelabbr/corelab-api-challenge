import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { IFile } from '@/interfaces/IFile'
import { File } from '@/entities/file'

export class PrismaFileRepository implements IFile {
    async upload(data: Prisma.FileUncheckedCreateInput): Promise<File> {
        const file = await prisma.file.create({
            data
        })

        return new File(file)
    }

    async verify(task_id: string): Promise<object | null> {
        const task = await prisma.task.findUnique({
            where: {
                id: task_id
            },
            select: {
                file: {
                    select: {
                        file_name: true
                    }
                }
            }
        })

        if(task?.file === null) {
            return null
        }

        return task
    }
    
}
