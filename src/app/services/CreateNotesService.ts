import { v4 as uuidv4 } from 'uuid'
import { INotes } from '../interfaces/INotes'
import { notesRepository } from '../../infra/db/sequelize/repositories/NotesRepository'

class CreateNotesService {
    async create(notes: INotes): Promise<INotes | void> {
        const lowerCaseColor = notes.color.toLowerCase()
        const id = notes.id = uuidv4()

        const newNotes: INotes = {
            id: id,
            title: notes.title,
            text: notes.text,
            color: lowerCaseColor,
            favorite: notes.favorite,
        }

        await notesRepository.create(newNotes)

        return newNotes
    }
}

const createNotesService = new CreateNotesService()

export { createNotesService }