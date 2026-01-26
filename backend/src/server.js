import dotenv from 'dotenv'
dotenv.config() // ⬅️ SEMPRE PRIMEIRO

import express from 'express'
import cors from 'cors'

// rotas
import authRoutes from './routes/auth.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'
import atendimentoRoutes from './routes/atendimento.routes.js'
import whatsappRoutes from './routes/whatsapp.routes.js'
import relatoriosRoutes from './routes/relatorios.routes.js'
import healthRoutes from './routes/health.routes.js'
import statusRoutes from './routes/status.routes.js'
// ⏰ CRON
import { iniciarRelatorioAutomatico } from './services/relatorio.cron.js'

// conexão Mongo
import { connectMongo } from './database/mongoose.js'

const app = express()

// middlewares globais
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
app.use('/api', relatoriosRoutes)
app.use('/api', healthRoutes)
app.use('/api/status', statusRoutes)

const PORT = process.env.PORT || 3001

async function startServer() {
  try {
    // 🟢 conexão Mongo
    await connectMongo()

    // ⏰ inicia relatório automático por e-mail
    iniciarRelatorioAutomatico()

    app.listen(PORT, () => {
      console.log(`🚀 API DC NET rodando na porta ${PORT}`)
    })
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error)
    process.exit(1)
  }
}

startServer()

