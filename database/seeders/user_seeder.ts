import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      name: 'test',
      email: 'test@email.com',
      password: '123456',
    })
  }
}
