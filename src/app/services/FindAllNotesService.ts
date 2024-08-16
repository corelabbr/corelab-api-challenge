import { notesRepository } from "../../infra/db/sequelize/repositories/NotesRepository"

class FindAllNotesService {
    async findAll() {
        const notes = await notesRepository.findAll()
        return notes
    }
}

const findAllNotesService = new FindAllNotesService()

export { findAllNotesService }