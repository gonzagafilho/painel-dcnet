import express from 'express'

console.log('🔥 TESTE SERVER JS CARREGADO')

const app = express()

app.get('/api/auth/me', (req, res) => {
  res.json({ teste: 'OK', origem: 'server.js' })
})

app.listen(3001, () => {
  console.log('🚀 TESTE SERVER ESCUTANDO 3001')
})
