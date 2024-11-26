import { File } from '@/entities/file'

export interface IFile {
    upload(data: File): Promise<File>
    verify(task_id: string): Promise<object | null>
}
