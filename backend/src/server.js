import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// rotas
import authRoutes from './src/routes/auth.js'
import dashboardRoutes from './src/routes/dashboard.routes.js'

dotenv.config()

const app = express()

// middlewares globais
app.use(cors())
app.use(express.json())

// rota de teste (opcional)
app.get('/', (req, res) => {
  res.json({ status: 'API DC NET ONLINE' })
})

// rotas reais da API
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
import atendimentoRoutes from './routes/atendimento.routes.js'

app.use('/api/atendimentos', atendimentoRoutes)

// porta
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 API DC NET rodando na porta ${PORT}`)
})
