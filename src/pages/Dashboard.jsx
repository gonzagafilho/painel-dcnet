import { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function Dashboard() {
  const [dados, setDados] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/dashboard/resumo')
      .then(res => setDados(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Carregando dados...</p>

  return (
    <>
      <h1>Painel</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginTop: '20px'
        }}
      >
        <Card titulo="Clientes" valor={dados.clientes} />
        <Card titulo="Atendimentos" valor={dados.atendimentos} />
        <Card titulo="Chatbot" valor={dados.chatbot} />
        <Card titulo="Servidor" valor={dados.servidor} />
      </div>
    </>
  )
}

function Card({ titulo, valor }) {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        padding: '20px',
        borderRadius: '12px'
      }}
    >
      <h3>{titulo}</h3>
      <strong>{valor}</strong>
    </div>
  )
}
