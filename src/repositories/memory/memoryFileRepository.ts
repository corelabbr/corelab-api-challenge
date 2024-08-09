import { File } from "@/entities/file";
import { randomUUID } from "crypto";

export class MemoryFileRepository {
    public items: File[] = []

    async upload(data: File): Promise<File> {
        const file = {
            id: randomUUID(),
            file_name: data.file_name,
            task_id: data.task_id
        }

        this.items.push(file)

        return file
    }

    async verify(task_id: string): Promise<object | null> {
        const file = this.items.find((Task) => Task.task_id === task_id)

        if(!file) {
            return null
        }

        return file
    }
}
