import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { MongoClient } from 'mongodb'

export default class MongoProvider {
  public static needsApplication = true
  private client: MongoClient | null = null

  constructor(protected app: ApplicationContract) {}

  public async register() {
    this.app.container.singleton('Database/Mongo', () => {
      return {
        connection: this.client,
        getClient: () => this.client,
        getDb: (dbName?: string) => this.client?.db(dbName),
      }
    })
  }

  public async boot() {
    const mongoUrl = 'mongodb://mongodb:27017/corenotes'

    try {
      this.client = await MongoClient.connect(mongoUrl)
      console.log('✓ MongoDB Connected Successfully')
    } catch (error) {
      console.error('✗ MongoDB Connection Error:', error)
      throw error
    }
  }

  public async ready() {
  }

  public async shutdown() {
    if (this.client) {
      await this.client.close()
      console.log('✓ MongoDB Connection Closed')
    }
  }
} 