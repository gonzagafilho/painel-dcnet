import dotenv from 'dotenv'
dotenv.config() // ⬅️ SEMPRE PRIMEIRO

import express from 'express'
import cors from 'cors'
import cron from 'node-cron'

// rotas
import authRoutes from './routes/auth.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'
import atendimentoRoutes from './routes/atendimento.routes.js'
import whatsappRoutes from './routes/whatsapp.routes.js'
import relatoriosRoutes from './routes/relatorios.routes.js'
import healthRoutes from './routes/health.routes.js'
import statusRoutes from './routes/status.routes.js'

// ⏰ CRONS
import { iniciarRelatorioAutomatico } from './services/relatorio.cron.js'
import { collectStatus } from './services/statusCollector.js'

// conexão Mongo
import { connectMongo } from './database/mongoose.js'

const app = express()

// middlewares globais
app.use(
  cors({
    origin: [
      'https://painelservidor.dcinfinity.net.br'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
)
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

    // ⏰ coleta de status do servidor a cada 5 minutos
    cron.schedule('*/5 * * * *', async () => {
      try {
        await collectStatus()
      } catch (err) {
        process.stderr.write(
          `Erro ao coletar status: ${err.message}\n`
        )
      }
    })

    app.listen(PORT)
  } catch (error) {
    process.stderr.write(
      `Erro ao iniciar servidor: ${error.message}\n`
    )
    process.exit(1)
  }
}

startServer()
