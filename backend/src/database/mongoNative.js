import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URI

let client
let db

export async function getDb() {
  if (db) return db

  client = new MongoClient(uri)
  await client.connect()

  db = client.db()
  console.log('🟢 Mongo Native conectado (webhook)')

  return db
}
