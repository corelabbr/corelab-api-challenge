import User from "../../../src/domain/entity/user";

describe("User", () => {
  it("should create a new user with a unique ID", () => {
    const user = User.newUser();
    expect(user.getId()).toBeDefined();
  });

  it("should create a user from an existing ID", () => {
    const id = "12345";
    const user = User.fromUser(id);
    expect(user.getId()).toBe(id);
  });
});