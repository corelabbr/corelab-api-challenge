import { notesRepository } from "../../infra/db/sequelize/repositories/NotesRepository";

class FindByIdNotesService {
    async findById(id: string) {
        const notes = await notesRepository.findById(id);
        return notes
    }
}

const findByIdNotesService = new FindByIdNotesService();

export { findByIdNotesService }