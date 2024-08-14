import { Note } from "@/domain/notes/entities/note";

export function sortNotes(notes: Note[]): Note[] {
	// Função auxiliar para ordenar por cor usando o valor do enum
	const sortByColor = (a: Note, b: Note): number => a.color - b.color;

	// Separar favoritos e não-favoritos
	const favoriteNotes = notes.filter((note) => note.fav);
	const nonFavoriteNotes = notes.filter((note) => !note.fav);

	// Ordenar ambas as listas por cor
	favoriteNotes.sort(sortByColor);
	nonFavoriteNotes.sort(sortByColor);

	// Combinar favoritos primeiro e depois os não-favoritos
	return [...favoriteNotes, ...nonFavoriteNotes];
}
