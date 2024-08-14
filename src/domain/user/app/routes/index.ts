import { FastifyInstance } from "fastify";
import { UserController } from "../controller/user-controller";

export async function UserRouter(fastify: FastifyInstance) {
	const controller = new UserController();
	fastify.post("/user", controller.create.bind(controller));
	fastify.get("/user/:sessionId?", controller.get.bind(controller));
	fastify.get("/user/id/:id?", controller.get.bind(controller));
}
