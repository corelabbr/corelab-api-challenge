import { INotes, INotesRepository } from "../../../../app/interfaces/INotes";
import { Notes } from "../models/notes";

class NotesRepository implements INotesRepository {
  async create(data: INotes): Promise<void> {
    const notes = await Notes.create({
      id: data.id,
      title: data.title,
      text: data.text,
      color: data.color,
      favorite: data.favorite,
    });
  }

  async update(data: INotes): Promise<void> {
    await Notes.update(
      {
        title: data.title,
        text: data.text,
        color: data.color,
        favorite: data.favorite
      },
      {
        where: {
          id: data.id
        }
      }
    );
  }

  async findByColor(color: string): Promise<INotes[]> {
    const notes = await Notes.findAll({
      where: {
        color: color
      },
      order: [['favorite', 'DESC']]
    });

    return notes.map(item => ({
      id: item.dataValues.id,
      title: item.dataValues.title,
      text: item.dataValues.text,
      color: item.dataValues.color,
      favorite: item.dataValues.favorite,
    }));
  }

  async findByFavorite(favorite: boolean): Promise<INotes[]> {
    const notes = await Notes.findAll({
      where: {
        favorite: favorite
      }
    });

    return notes.map(note => ({
      id: note.dataValues.id,
      title: note.dataValues.title,
      text: note.dataValues.text,
      color: note.dataValues.color,
      favorite: note.dataValues.favorite,
    }));
  }

  async findById(id: string): Promise<INotes | void> {
    const notes = await Notes.findByPk(id);
    if (notes) {
      return {
        id: notes.dataValues.id,
        title: notes.dataValues.title,
        text: notes.dataValues.text,
        color: notes.dataValues.color,
        favorite: notes.dataValues.favorite,
      };
    }
    return
  }

  async findAll(): Promise<INotes[]> {
    const notes = await Notes.findAll({
      order: [['favorite', 'DESC']]
    });
    return notes.map(note => {
      return {
        id: note.dataValues.id,
        title: note.dataValues.title,
        text: note.dataValues.text,
        color: note.dataValues.color,
        favorite: note.dataValues.favorite,
      }
    });
  }

  async delete(id: string): Promise<void> {
    await Notes.destroy({ where: { id } });
  }

}

const notesRepository = new NotesRepository();

export { notesRepository };