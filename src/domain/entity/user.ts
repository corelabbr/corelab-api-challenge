import { v7 } from 'uuid'

export default class User {
  private readonly id: string

  private constructor(id: string) {
    this.id = id
  }

  static newUser(): User {
    return new User(v7())
  }

  static fromUser(id: string): User {
    return new User(id)
  }

  getId(): string {
    return this.id
  }
}
