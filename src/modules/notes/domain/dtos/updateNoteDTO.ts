import { createNoteDTO } from './createNoteDTO'

export type updateNoteDTO = Partial<createNoteDTO> & { id: string }
