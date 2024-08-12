import { FastifyInstance } from "fastify";
import CreateNoteHandler from "../controllers/create-note-controller";

import GetNoteHandler from "../controllers/get-note-controller";
import ListNoteHandler from "../controllers/list-notes";
import UpdateNotesHandler from "../controllers/update-note";
import UpdateNoteInput from "../../application/usecases/notes/update/update-note-input";
import DeleteNoteHandler from "../controllers/delete-note";
import DeleteNoteInput from "../../application/usecases/notes/delete/delete-note-input";
import SearchNoteHandler from "../controllers/search-note";
import { CreateNoteInput } from '../../application/usecases/notes/create/create-note-input';
import ListNotesInput from '../../application/usecases/notes/retrieve/list/list-notes-input';
import GetNoteInput from '../../application/usecases/notes/retrieve/get/get-note-input';

export default class NotesRoutes {
  constructor(
    private readonly server: FastifyInstance,
    private readonly createNoteHandler: CreateNoteHandler,
    private readonly getNoteHandler: GetNoteHandler,
    private readonly listNotesHandler: ListNoteHandler,
    private readonly updateNotesHandler: UpdateNotesHandler,
    private readonly deleteNoteHandler: DeleteNoteHandler,
    private readonly searchNoteHandler: SearchNoteHandler,
  ) {}

  async list(): Promise<FastifyInstance> {
    return this.server.get("/notes", async (request, reply) => {
      const query = request.query as any;
      const headers = request.headers as any;
      const noteIds = query.notes_ids ? query.notes_ids.split(",") : [];
      if (!headers.user_id) {
        return reply.status(400).send({ message: "User id is required" });
      }
      const payload = new ListNotesInput(
        noteIds,
        headers.user_id
      )
      const notes = await this.listNotesHandler.execute(payload);
      return notes;
    });
  }
  async create(): Promise<FastifyInstance> {
    return this.server.post("/notes", async (request, reply) => {
      const payload = request.body as any;
      const headers = request.headers as any;
      if(!headers.user_id) {
        return reply.status(400).send({ message: "User id is required" });
      }
      if (!payload.title || !payload.content) {
        return reply.status(400).send({ message: "Bad request" });
      }
      const input = new CreateNoteInput(
        headers.user_id,
        payload.title,
        payload.content,
        payload.color,
        payload.favorite
      )
      const note = await this.createNoteHandler.execute(input);
      return reply.status(201).send(note);
    });
  }
  async get(): Promise<FastifyInstance> {
    return this.server.get("/notes/:id", async (request, reply) => {
      const params = request.params as any;
      const headers = request.headers as any;
      if(!headers.user_id) {
        return reply.status(400).send({ message: "User id is required" });
      }
      if (!params.id) {
        return reply.status(400).send({ message: "Note id is required" });
      }
      const payload = new GetNoteInput(
        params.id,
        headers.user_id
      )
      const note = await this.getNoteHandler.execute(payload);
      return reply.status(200).send(note);
    });
  }
  async put(): Promise<FastifyInstance> {
    return this.server.put("/notes/:id", async (request, reply) => {
      const params = request.params as any;
      const payload = request.body as any;
      const headers = request.headers as any;
      if(!headers.user_id) {
        return reply.status(400).send({ message: "User id is required" });
      }
      if (!payload) {
        return reply.status(400).send({ message: "Missing payload." });
      }
      const data = new UpdateNoteInput(
        params.id,
        headers.user_id,
        payload.title,
        payload.content,
        payload.color,
        payload.favorite,
      );
      const note = await this.updateNotesHandler.execute(data);
      return reply.status(200).send(note);
    });
  }
  async delete(): Promise<FastifyInstance> {
    return this.server.delete("/notes/:id", async (request, reply) => {
      const params = request.params as any;
      const headers = request.headers as any;
      if (!params.id || !headers.user_id) {
        return reply.status(400).send({ message: "Bad request" });
      }
      const deleteNoteInput = new DeleteNoteInput(params.id, headers.user_id);
      await this.deleteNoteHandler.execute(deleteNoteInput);
      return reply.status(204).send()
    });
  }
  async search(): Promise<FastifyInstance> {
    return this.server.get("/notes/search", async (request, reply) => {
      const query = request.query as any;
      const headers = request.headers as any;
      if (!query.q) {
        return reply.status(400).send({ message: "Query string is required" });
      }
      if (!headers.user_id) {
        return reply.status(400).send({ message: "User id is required" });
      }
      const notes = await this.searchNoteHandler.execute({ keywords: query.q, userId: headers.user_id});
      return reply.status(200).send(notes);
    });
  }
}
