import { Router } from 'express';
import { getAllNotes, createNote, deleteNote, updateNote, toggleFavorite, toggleColor } from '../controllers/note.controller';

const router = Router();

router.get('/', getAllNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.patch('/:id/favorite', toggleFavorite);
router.patch('/:id/color', toggleColor);

export default router;
