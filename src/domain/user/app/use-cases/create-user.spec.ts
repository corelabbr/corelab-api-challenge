import { beforeEach, describe, expect, it } from "vitest";
import { CreateUser } from "./create-user";
import { FakeUserRepository } from "@/test/fake-repositories/fake-user-repository";

describe("Test create user use case", () => {
	let sut: CreateUser;
	let userRepository: FakeUserRepository;
	beforeEach(() => {
		userRepository = new FakeUserRepository();
		sut = new CreateUser(userRepository);
	});
	it("should create a user", async () => {
		const response = await sut.execute();
		expect(response.isRight()).toBe(true);
		expect(response.value).toBeTypeOf("string");
	});
});
