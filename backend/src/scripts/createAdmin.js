import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Admin from '../models/Admin.js'

dotenv.config()

await mongoose.connect(process.env.MONGO_URI)

const exists = await Admin.findOne({ email: 'admin@dcnet.com' })

if (exists) {
  console.log('⚠️ Admin já existe')
  process.exit()
}

await Admin.create({
  email: 'admin@dcnet.com',
  senha: '123456',
  nome: 'Administrador DC NET'
})

console.log('✅ Admin criado com sucesso')
process.exit()

