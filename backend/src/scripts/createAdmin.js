import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from '../models/User.js'

dotenv.config()

async function criarAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    const email = 'admin@dcnet.com.br'
    const senha = '123456'

    const existe = await User.findOne({ email })
    if (existe) {
      console.log('Admin já existe ❗')
      process.exit()
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    await User.create({
      nome: 'Administrador',
      email,
      senha: senhaHash
    })

    console.log('Admin criado com sucesso ✅')
    console.log('Email:', email)
    console.log('Senha:', senha)

    process.exit()
  } catch (err) {
    console.error('Erro ao criar admin ❌', err)
    process.exit(1)
  }
}

criarAdmin()
