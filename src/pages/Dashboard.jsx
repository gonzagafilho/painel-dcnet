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

  // 👉 NOVO: período ativo
  const [periodoAtivo, setPeriodoAtivo] = useState(7)

  // 👉 FUNÇÃO CENTRAL (NÃO DUPLICAR API)
  async function carregarDados(dias = periodoAtivo) {
    try {
      setLoading(true)
      setErro(null)

      // 🔹 RESUMO
      const resumoResponse = await api.get(
        `/dashboard/resumo?dias=${dias}`
      )
      setDados(resumoResponse.data)

      // 🔹 GRÁFICO DIÁRIO
      const graficoResponse = await api.get(
        `/dashboard/atendimentos-dia?dias=${dias}`
      )
      setGraficoDia(graficoResponse.data)

      // 🔹 GRÁFICO POR STATUS
      const statusResponse = await api.get(
        `/dashboard/atendimentos-status?dias=${dias}`
      )
      setGraficoStatus(statusResponse.data)
    } catch (err) {
      console.error('Erro ao carregar dashboard', err)
      setErro('Erro ao carregar dados do painel')
    } finally {
      setLoading(false)
    }
  }

  // 👉 CARREGA AO ENTRAR NA TELA
  useEffect(() => {
    carregarDados(periodoAtivo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 👉 TROCA DE PERÍODO (BOTÕES)
  function mudarPeriodo(dias) {
    setPeriodoAtivo(dias)
    carregarDados(dias)
  }

  // 👉 LOADING GLOBAL
  if (loading) {
    return <DashboardSkeleton />
  }

  // 👉 ERRO
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

      {/* 🔘 BOTÕES DE PERÍODO */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        {[1, 7, 15, 30].map((dias) => (
          <button
            key={dias}
            onClick={() => mudarPeriodo(dias)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background:
                periodoAtivo === dias ? '#3b82f6' : '#374151',
              color: '#fff',
              transition: '0.2s'
            }}
          >
            {dias === 1 ? 'Hoje' : `${dias} dias`}
          </button>
        ))}
      </div>

      {/* 🔹 CARDS */}
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

      {/* 🔹 GRÁFICOS */}
      <DashboardChart dados={dados} />
      <DashboardDailyChart dados={graficoDia} />
      <DashboardStatusChart dados={graficoStatus} />
    </>
  )
}
