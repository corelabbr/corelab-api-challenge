declare module '@ioc:Database/Mongo' {
  import { MongoClient, Db } from 'mongodb'

  export interface MongoContract {
    connection: MongoClient | null
    getClient(): MongoClient | null
    getDb(name?: string): Db | undefined
  }

  const Mongo: MongoContract
  export default Mongo
} 