import { resetDatabase } from "@/db/reset-database";
import app from "@/index";
import { UserFactory } from "@/test/factory/user-factory";
import request from "supertest";
import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
import { DrizzleUserRepository } from "../repository/drizzle/user-repository";

describe("Tests end2end for user controller", () => {
	let repository: DrizzleUserRepository;
	beforeAll(async () => {
		await app.ready();
	});
	beforeEach(async () => {
		resetDatabase();
		repository = new DrizzleUserRepository();
	});
	afterAll(async () => {
		await app.close();
	});
	it("Should create a new user", async () => {
		const response = await request(app.server).post("/user");
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("session_id");
	});
	it("Should get a user with session_id", async () => {
		const user = UserFactory();
		await repository.save(user);
		const response = await request(app.server).get(
			`/user?sessionId=${user.session_id}`
		);
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("_id");
	});
	it("Should return 404 when user not found", async () => {
		const response = await request(app.server)
			.get("/user")
			.query({ user_id: "invalid_user_id" });
		expect(response.status).toBe(404);
	});
});
