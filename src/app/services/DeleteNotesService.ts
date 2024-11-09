import { notesRepository } from "../../infra/db/sequelize/repositories/NotesRepository"

class DeleteNotesService {
    async delete(id: string) {
        const notes = await notesRepository.delete(id)
        return notes
    }
}

const deleteNotesService = new DeleteNotesService()

export { deleteNotesService }