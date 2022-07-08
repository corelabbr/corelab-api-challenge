import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI);

client.connect();

const db = client.db(process.env.DATABASE_NAME);

export default db;
