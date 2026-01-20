import { useEffect, useState } from 'react'
import  api  from '../services/api'
import Card from '../components/Card'
import DashboardChart from '../components/DashboardChart'
import DashboardDailyChart from '../components/DashboardDailyChart'

export default function Dashboard() {
  const [dados, setDados] = useState(null)
  const [graficoDia, setGraficoDia] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // RESUMO
    api
      .get('/api/dashboard/resumo')
      .then(res => {
        console.log('DADOS API:', res.data)
        setDados(res.data)
      })
      .catch(err => {
        console.error('Erro ao carregar resumo', err)
      })
      .finally(() => {
        setLoading(false)
      })

    // GRÁFICO DIÁRIO
    api
      .get('/api/dashboard/atendimentos-dia')
      .then(res => {
        setGraficoDia(res.data)
      })
      .catch(err => {
        console.error('Erro gráfico diário', err)
      })
  }, [])

  if (loading) {
    return <p style={{ color: '#fff' }}>Carregando dados...</p>
  }

  return (
    <>
      <h1 style={{ color: '#fff' }}>Painel</h1>

      {/* CARDS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginTop: '20px'
        }}
      >
        <Card
          titulo="Clientes"
          valor={dados?.clientes ?? '--'}
          cor="#3b82f6"
          icone="👥"
        />

        <Card
          titulo="Atendimentos"
          valor={dados?.atendimentos ?? '--'}
          cor="#22c55e"
          icone="📞"
        />

        <Card
          titulo="Chatbot"
          valor={dados?.chatbot ?? '--'}
          cor="#a855f7"
          icone="🤖"
        />

        <Card
          titulo="Servidor"
          valor={dados?.servidor ?? '--'}
          cor="#f97316"
          icone="🖥️"
        />
      </div>

      {/* GRÁFICO GERAL */}
      <DashboardChart dados={dados} />

      {/* GRÁFICO DIÁRIO (MONGODB) */}
      <DashboardDailyChart dados={graficoDia} />
    </>
  )
}
