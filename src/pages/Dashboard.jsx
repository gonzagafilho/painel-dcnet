import { useEffect, useState } from 'react'
import api from '../services/api'
import Card from '../components/Card'
import DashboardChart from '../components/DashboardChart'
import DashboardDailyChart from '../components/DashboardDailyChart'
import DashboardStatusChart from '../components/DashboardStatusChart'
import DashboardSkeleton from '../components/DashboardSkeleton'

export default function Dashboard() {
  const [dados, setDados] = useState(null)
  const [graficoDia, setGraficoDia] = useState([])
  const [graficoStatus, setGraficoStatus] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function carregarDados() {
      try {
        // 🔹 RESUMO
        const resumoResponse = await api.get('/dashboard/resumo')
        setDados(resumoResponse.data)

        // 🔹 GRÁFICO DIÁRIO
        const graficoResponse = await api.get(
          '/dashboard/atendimentos-dia'
        )
        setGraficoDia(graficoResponse.data)

        // 🔹 GRÁFICO POR STATUS
        const statusResponse = await api.get(
          '/dashboard/atendimentos-status'
        )
        setGraficoStatus(statusResponse.data)
      } catch (err) {
        console.error('Erro ao carregar dashboard', err)
        setErro('Erro ao carregar dados do painel')
      } finally {
        setLoading(false)
      }
    }

    carregarDados()
  }, [])

  if (loading) {
    return <DashboardSkeleton />
  }

  if (erro) {
    return (
      <p style={{ color: 'red', padding: '24px' }}>
        {erro}
      </p>
    )
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

      {/* GRÁFICO DIÁRIO */}
      <DashboardDailyChart dados={graficoDia} />

      {/* GRÁFICO POR STATUS */}
      <DashboardStatusChart dados={graficoStatus} />
    </>
  )
}
