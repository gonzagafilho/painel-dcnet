import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// rotas
import authRoutes from './routes/auth.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'
import atendimentoRoutes from './routes/atendimento.routes.js'
import whatsappRoutes from './routes/whatsapp.routes.js'

// conexão Mongo (Mongoose)
import { connectMongo } from './database/mongoose.js'

dotenv.config()

const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// rota teste
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
    // 🔥 ÚNICA conexão com MongoDB (OFICIAL)
    await connectMongo()

    app.listen(PORT, () => {
      console.log(`🚀 API DC NET rodando na porta ${PORT}`)
    })
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error)
    process.exit(1)
  }
}

startServer()

