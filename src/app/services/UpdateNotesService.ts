import { notesRepository } from "../../infra/db/sequelize/repositories/NotesRepository"
import { INotes } from "../interfaces/INotes"

class UpdateNotesService {
    async update(id: string, updatedData: INotes): Promise<INotes | void> {
        const notes = await notesRepository.findById(id)

        if (notes) {
            const notesUpdate: INotes = {
                id: notes!.id,
                title: updatedData.title,
                text: updatedData.text,
                color: updatedData.color,
                favorite: updatedData.favorite,
            }

            await notesRepository.update(notesUpdate)

            return notesUpdate
        }

        return
    }
}

const updateNotesService = new UpdateNotesService()

export { updateNotesService }