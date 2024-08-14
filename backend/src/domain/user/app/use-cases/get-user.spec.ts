import { FakeUserRepository } from "@/test/fake-repositories/fake-user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUser } from "./get-user";
import { UserFactory } from "@/test/factory/user-factory";
import { ResourceNotFoundError } from "@/core/errors/errors/not_found";

describe("Get User", () => {
	let sut: GetUser;
	let userRepository: FakeUserRepository;
	beforeEach(() => {
		userRepository = new FakeUserRepository();
		sut = new GetUser(userRepository);
	});
	it("should return a user while passing the userId", async () => {
		const user = UserFactory();
		await userRepository.save(user);
		const response = await sut.execute({ id: user.id });
		expect(response.isRight()).toBe(true);
		expect(response.value).toBe(user);
	});
	it("should return a user while passing the sessionId", async () => {
		const user = UserFactory();
		await userRepository.save(user);
		const response = await sut.execute({ sessionId: user.session_id });
		expect(response.isRight()).toBe(true);
		expect(response.value).toBe(user);
	});
	it("should return a ResourceNotFoundError if the user is not found", async () => {
		const response = await sut.execute({ id: "invalid-id" });
		expect(response.isLeft()).toBe(true);
		expect(response.value).toBeInstanceOf(ResourceNotFoundError);
	});
});

