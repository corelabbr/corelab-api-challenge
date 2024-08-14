import { FastifyReply, FastifyRequest } from "fastify";
import { DrizzleUserRepository } from "../repository/drizzle/user-repository";
import { CreateUser } from "../use-cases/create-user";
import { GetUser } from "../use-cases/get-user";
import { GetUserSchema } from "./validations-schemas";
import { z } from "zod";

export class UserController {
	userRepository = new DrizzleUserRepository();
	createUser = new CreateUser(this.userRepository);
	getUser = new GetUser(this.userRepository);

	async create(request: FastifyRequest, reply: FastifyReply) {
		try {
			const response = await this.createUser.execute();
			return reply.status(201).send({ session_id: response.value });
		} catch (error) {
			return reply
				.status(500)
				.send({ message: "Internal server error" + error });
		}
	}
	async get(
		req: FastifyRequest<{ Querystring: z.infer<typeof GetUserSchema> }>,
		reply: FastifyReply
	) {
		// Validação da query string usando o esquema zod
		const validationResult = GetUserSchema.safeParse(req.query);
		if (!validationResult.success) {
			return reply.status(400).send(validationResult.error.errors);
		}

		// Executando o caso de uso de obtenção de usuário
		const response = await this.getUser.execute(req.query);

		if (response.isLeft()) {
			return reply.status(404).send(response.value.message);
		}

		return reply.status(200).send(response.value);
	}
}
