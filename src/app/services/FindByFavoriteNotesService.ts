import { notesRepository } from "../../infra/db/sequelize/repositories/NotesRepository"

class FindByFavoriteNotesService {
    async findByFavorite(favorite: boolean) {
        const notes = await notesRepository.findByFavorite(favorite)
        return notes
    }
}

const findByFavoriteNotesService = new FindByFavoriteNotesService()

export { findByFavoriteNotesService }