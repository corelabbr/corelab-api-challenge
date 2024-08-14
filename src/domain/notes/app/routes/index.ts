import { FastifyInstance } from "fastify";
import { NotesController } from "../controller/notes-controller";

export async function NoteRoutes(fastify: FastifyInstance) {
	const controller = new NotesController();

	fastify.post("/notes", controller.create.bind(controller));

	fastify.get("/notes/:id", controller.get.bind(controller));
	// /notes?title={title}&userId={userId}
	fastify.get("/notes", controller.getByTitle.bind(controller));

	fastify.get("/notes/user/:user_id", controller.getByUser.bind(controller));

	fastify.put("/notes/:id", controller.update.bind(controller));

	fastify.delete("/notes/:id", controller.delete.bind(controller));

	fastify.post("/notes/file", controller.uploadFile.bind(controller));

	fastify.get("/notes/file/:filename", controller.getFile.bind(controller));
}
