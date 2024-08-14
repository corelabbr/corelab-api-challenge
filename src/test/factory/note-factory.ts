import { Note } from "@/domain/notes/entities/note";
import { faker } from "@faker-js/faker";

export function NoteFactory(id?: string): Note {
	return Note.create(
		{
			title: faker.lorem.words(),
			description: faker.lorem.paragraph(),
			fav: false,
			color: faker.number.int({ min: 0, max: 11 }),
			file: faker.system.filePath(),
			user_id: faker.string.uuid()
		},
		id
	);
}
