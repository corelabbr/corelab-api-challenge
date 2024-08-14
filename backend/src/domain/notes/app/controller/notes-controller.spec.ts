import { resetDatabase } from "@/db/reset-database";
import app from "@/index";
import { NoteFactory } from "@/test/factory/note-factory";
import request from "supertest";
import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
import { DrizzleNoteRepository } from "../repository/drizzle/note-repository";
import { DrizzleUserRepository } from "@/domain/user/app/repository/drizzle/user-repository";
import { User } from "@/domain/user/entities/user";
import { generateSessionId } from "@/domain/user/util/generate-session-id";

describe("Tests end2end for user controller", () => {
	const noteRepository = new DrizzleNoteRepository();
	const userRepository = new DrizzleUserRepository();
	beforeAll(async () => {
		await app.ready();
	});
	beforeEach(async () => {
		resetDatabase();
	});
	afterAll(async () => {
		await app.close();
	});
	it("Should create a new note", async () => {
		const note = NoteFactory();
		await userRepository.save(
			User.create({ session_id: generateSessionId() }, note.user_id)
		);
		const response = await request(app.server).post("/notes").send({
			title: note.title,
			fav: note.fav,
			color: note.color,
			file: note.file,
			user_id: note.user_id
		});
		expect(response.status).toBe(201);
		expect(response.body.props.title).toBe(note.title);
	});
	it("Should get a note by id", async () => {
		const note = NoteFactory();
		await userRepository.save(
			User.create({ session_id: generateSessionId() }, note.user_id)
		);
		await noteRepository.save(note);
		const response = await request(app.server).get(`/notes/${note.id}`);
		expect(response.status).toBe(200);
		expect(response.body._id).toBe(note.id);
	});
	it("Should get a note by user id", async () => {
		const note = NoteFactory();
		await userRepository.save(
			User.create({ session_id: generateSessionId() }, note.user_id)
		);
		await noteRepository.save(note);
		const response = await request(app.server).get(
			`/notes/user/${note.user_id}`
		);
		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
	});
	it("Should update a note", async () => {
		const note = NoteFactory();
		await userRepository.save(
			User.create({ session_id: generateSessionId() }, note.user_id)
		);
		await noteRepository.save(note);
		const response = await request(app.server).put(`/notes/${note.id}`).send({
			id: note.id,
			fav: true,
			color: 1,
			file: null,
			user_id: note.user_id
		});
		expect(response.status).toBe(200);
		expect(response.body.props.fav).toBe(true);
		expect(response.body.props.color).toBe(1);
	});

	it("Should delete a note", async () => {
		const note = NoteFactory();
		await userRepository.save(
			User.create({ session_id: generateSessionId() }, note.user_id)
		);
		await noteRepository.save(note);
		const response = await request(app.server).delete(`/notes/${note.id}`);

		expect(response.status).toBe(204);
		expect(await noteRepository.findById(note.id)).toBe(null);
	});
	it("should be able to upload a file", async () => {
		const note = NoteFactory();
		await userRepository.save(
			User.create({ session_id: generateSessionId() }, note.user_id)
		);
		await noteRepository.save(note);
		const response = await request(app.server)
			.post("/notes/file")
			.attach("file", "test/fixtures/dog.jpg");
		expect(response.status).toBe(200);
		expect(response.body.filename).toBeTypeOf("string");
	});
	it("should find a note by title", async () => {
		const note = NoteFactory();
		await userRepository.save(
			User.create({ session_id: generateSessionId() }, note.user_id)
		);
		await noteRepository.save(note);
		const response = await request(app.server).get(
			`/notes?title=${note.title}&user_id=${note.user_id}`
		);
		console.log(response.body);

		expect(response.status).toBe(200);
		expect(response.body[0].props.title).toBe(note.title);
	});
});
