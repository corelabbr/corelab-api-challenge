import { FastifyInstance } from "fastify";
import CreateUserHandler from "../controllers/create-user";

export default class UsersRoutes {
  constructor(
    private readonly server: FastifyInstance,
    private readonly createUserHandler: CreateUserHandler,
  ) {}

  async create(): Promise<FastifyInstance> {
    return this.server.post("/users", async (request, reply) => {
      const handler = await this.createUserHandler.execute();
      return reply.status(201).send({ data: handler });
    });
  }
}