import mongoose from 'mongoose'

export async function connectMongo() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI não definida no .env')
    }

    await mongoose.connect(process.env.MONGO_URI)

    console.log('🟢 Mongo Mongoose conectado com sucesso')
  } catch (error) {
    console.error('🔴 Erro ao conectar Mongo Mongoose:', error)
    process.exit(1)
  }
}

