import dotenv from "dotenv";
import App from "./infra/app";
import NotesRoutes from "./infra/routes/notes";
import CreateNoteHandler from "./infra/controllers/create-note-controller";
import NotesRepositoryImpl from "./infra/repository/postgres/notes-repository-impl";
import UsersRepositoryImpl from "./infra/repository/postgres/user-repository-impl";
import { createNoteTableQuery, createUserTableQuery } from "./db/queries";
import UsersRoutes from "./infra/routes/users";
import CreateUserHandler from "./infra/controllers/create-user";
import GetNoteHandler from "./infra/controllers/get-note-controller";
import ListNoteHandler from "./infra/controllers/list-notes";
import UpdateNotesHandler from "./infra/controllers/update-note";
import DeleteNoteHandler from "./infra/controllers/delete-note";
import SearchNoteHandler from "./infra/controllers/search-note";

dotenv.config();

const app = new App();
app.initDB().then(async (client) => {
  client.query(createUserTableQuery, []);
  client.query(createNoteTableQuery, []);
  app.start();
  const notesRepository = new NotesRepositoryImpl(client);
  const usersRepository = new UsersRepositoryImpl(client);

  const createUserHandler = new CreateUserHandler(usersRepository);

  const createNoteHandler = new CreateNoteHandler(
    notesRepository,
    usersRepository,
  );
  const getNoteHandler = new GetNoteHandler(notesRepository);
  const listNotesHandler = new ListNoteHandler(notesRepository);
  const updateNotesHandler = new UpdateNotesHandler(notesRepository, usersRepository);
  const deleteNotesHandler = new DeleteNoteHandler(notesRepository, usersRepository);
  const searchNoteHandler = new SearchNoteHandler(notesRepository, usersRepository);

  const noteRoutes = new NotesRoutes(
    app.server,
    createNoteHandler,
    getNoteHandler,
    listNotesHandler,
    updateNotesHandler,
    deleteNotesHandler,
    searchNoteHandler
  );
  const userRoutes = new UsersRoutes(app.server, createUserHandler);

  await noteRoutes.create();
  await noteRoutes.search();
  await noteRoutes.list();
  await noteRoutes.get();
  await noteRoutes.put();
  await noteRoutes.delete();
  
  await userRoutes.create();
});
