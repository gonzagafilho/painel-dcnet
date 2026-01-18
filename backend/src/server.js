import authRoutes from './routes/auth.js'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado ✅'))
  .catch(err => console.error('Erro MongoDB ❌', err))

app.get('/', (req, res) => {
  res.send('API DC NET rodando 🚀')
})

const PORT = process.env.PORT || 3001
app.use('/api/auth', authRoutes)
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
