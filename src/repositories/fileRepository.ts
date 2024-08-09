import { File } from '@/entities/file'

export interface FileRepository {
    upload(data: File): Promise<File>
    verify(task_id: string): Promise<object | null>
}
