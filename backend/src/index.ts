import Fastify from "fastify";
import { UserRouter } from "./domain/user/app/routes";
import { NoteRoutes } from "./domain/notes/app/routes";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import cors from "@fastify/cors";
// @ts-expect-error - This is a workaround to use __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = Fastify();

app.register(multipart); // Register multipart plugin
// Register routes
app.register(cors, {
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE"]
});
app.register(fastifyStatic, {
	root: resolve(__dirname, "../uploads"),
	prefix: "/files/" // Prefix /files/ to all files
});
app.register(UserRouter);
app.register(NoteRoutes);

// Set up error handler
app.setErrorHandler((error, request, reply) => {
	console.error(error);
	reply.status(500).send({ message: "Internal server error" });
});
export default app;
