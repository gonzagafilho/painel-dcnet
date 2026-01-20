import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'
import dashboardRoutes from './routes/dashboard.routes.js'
import atendimentoRoutes from './routes/atendimento.routes.js'

dotenv.config()

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

// porta
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 API DC NET rodando na porta ${PORT}`)
})

