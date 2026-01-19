import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

console.log('🔥 SERVER DC NET REAL CARREGADO')

const app = express()
app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado ✅'))
  .catch(err => console.error('Erro MongoDB ❌', err))

// rota raiz
app.get('/', (req, res) => {
  res.send('API DC NET rodando 🚀')
})

// ROTA DE TESTE (SEM JWT)
app.get('/api/auth/me', (req, res) => {
  res.status(401).json({ message: 'Token não fornecido' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🚀 API DC NET escutando na porta ${PORT}`)
})
