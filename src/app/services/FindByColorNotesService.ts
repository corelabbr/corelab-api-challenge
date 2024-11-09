import { notesRepository } from "../../infra/db/sequelize/repositories/NotesRepository"

class FindByColorNotesService {
    async findByColor(color: string) {
        const notes = await notesRepository.findByColor(color)
        return notes
    }
}

const findByColorNotesService = new FindByColorNotesService()

export { findByColorNotesService }