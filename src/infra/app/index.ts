import fastify, { type FastifyInstance} from "fastify";
import cors from "@fastify/cors";
import Database from "../database/pg-connection-adapter";
import PgPromiseConnectionAdapter from "../database/pg-connection-adapter";
import ApiError from "../../domain/error/error";


export default class App {
  server: FastifyInstance
  constructor() {
    this.server = fastify();
    this.cors();
    this.server.setErrorHandler((error, request, reply) => {
      if (error instanceof ApiError) {
        reply.status(error.statusCode).send({ error: error.message });
      } else {
        reply.status(500).send({ error: 'Internal Server Error' });
      }
    });
    console.log('App initialized');
  }
  private cors() {
    this.server.register(cors, {
      origin: ["http://localhost:3000", "https://clab-web-challenge.vercel.app", "clab-web-challenge.vercel.app"],
      allowedHeaders: ["Content-Type", "user_id"],
    });
  }
  private errorHandling() {
    
  }
  async initDB(): Promise<PgPromiseConnectionAdapter> {
    return Database.getInstance();
  }
  start() {
    this.server.listen({ host: "0.0.0.0", port: 8080 }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  }
}