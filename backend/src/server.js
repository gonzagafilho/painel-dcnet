import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import authRoutes from './routes/auth.js'
import dashboardRoutes from './routes/dashboard.routes.js'
import atendimentoRoutes from './routes/atendimento.routes.js'
import whatsappRoutes from './routes/whatsapp.routes.js'

dotenv.config()

// 🔒 impedir buffer antes da conexão
mongoose.set('bufferCommands', false)

const app = express()

// middlewares globais
app.use(cors())
app.use(express.json())

// rota de teste
app.get('/', (req, res) => {
  res.json({ status: 'API DC NET ONLINE' })
})

// rotas da API
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/atendimentos', atendimentoRoutes)
app.use('/api', whatsappRoutes)

const PORT = process.env.PORT || 3100

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    await mongoose.connection.asPromise()

    console.log('MongoDB conectado ✅')

    app.listen(PORT, () => {
      console.log(`🚀 API DC NET rodando na porta ${PORT}`)
    })
  } catch (error) {
    console.error('❌ Erro ao conectar no MongoDB:', error)
    process.exit(1)
  }
}

startServer()

