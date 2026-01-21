import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import Card from '../components/Card'
import DashboardChart from '../components/DashboardChart'
import DashboardDailyChart from '../components/DashboardDailyChart'
import DashboardStatusChart from '../components/DashboardStatusChart'
import DashboardSkeleton from '../components/DashboardSkeleton'

export default function Dashboard() {
  const navigate = useNavigate()

  const [dados, setDados] = useState(null)
  const [graficoDia, setGraficoDia] = useState([])
  const [graficoStatus, setGraficoStatus] = useState([])
  const [erro, setErro] = useState(null)

  // 🔹 LOADINGS SEPARADOS
  const [loadingInicial, setLoadingInicial] = useState(true)
  const [loadingFiltro, setLoadingFiltro] = useState(false)

  // 🔹 PERÍODO ATIVO
  const [periodoAtivo, setPeriodoAtivo] = useState(7)

  // 🔹 LOGOUT
  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  // 🔒 PROTEÇÃO DE ROTA (EVITA 401)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  // 🔹 FUNÇÃO CENTRAL DE CARGA
  async function carregarDados(dias = periodoAtivo, inicial = false) {
    try {
      if (inicial) {
        setLoadingInicial(true)
      } else {
        setLoadingFiltro(true)
      }

      setErro(null)

      const resumoResponse = await api.get(
        `/dashboard/resumo?dias=${dias}`
      )
      setDados(resumoResponse.data)

      const graficoResponse = await api.get(
        `/dashboard/atendimentos-dia?dias=${dias}`
      )
      setGraficoDia(graficoResponse.data)

      const statusResponse = await api.get(
        `/dashboard/atendimentos-status?dias=${dias}`
      )
      setGraficoStatus(statusResponse.data)
    } catch (err) {
      console.error('Erro ao carregar dashboard', err)
      setErro('Erro ao carregar dados do painel')
    } finally {
      setLoadingInicial(false)
      setLoadingFiltro(false)
    }
  }

  // 🔹 PRIMEIRA CARGA (SÓ SE TIVER TOKEN)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      carregarDados(periodoAtivo, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 🔹 TROCA DE PERÍODO
  function mudarPeriodo(dias) {
    setPeriodoAtivo(dias)
    carregarDados(dias, false)
  }

  // 🔹 SKELETON SÓ NA PRIMEIRA VEZ
  if (loadingInicial) {
    return <DashboardSkeleton />
  }

  // 🔹 ERRO
  if (erro) {
    return (
      <p style={{ color: 'red', padding: '24px' }}>
        {erro}
      </p>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      {/* 🔝 HEADER COM LOGOUT */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingBottom: '16px',
          marginBottom: '20px',
          borderBottom: '1px solid #374151'
        }}
      >
        <h1 style={{ color: '#fff', margin: 0 }}>Painel</h1>

        <button
          onClick={logout}
          style={{
            background: '#dc2626',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Sair
        </button>
      </div>

      {/* 🔘 BOTÕES DE PERÍODO */}
      <div style={{ display: 'flex', gap: '10px' }}>
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

      {/* 🔄 LOADING SUAVE */}
      {loadingFiltro && (
        <p style={{ color: '#9ca3af', marginTop: '10px' }}>
          Atualizando dados...
        </p>
      )}

      {/* 🔹 CARDS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginTop: '20px'
        }}
      >
        <Card titulo="Clientes" valor={dados?.clientes ?? '--'} cor="#3b82f6" icone="👥" />
        <Card titulo="Atendimentos" valor={dados?.atendimentos ?? '--'} cor="#22c55e" icone="📞" />
        <Card titulo="Chatbot" valor={dados?.chatbot ?? '--'} cor="#a855f7" icone="🤖" />
        <Card titulo="Servidor" valor={dados?.servidor ?? '--'} cor="#f97316" icone="🖥️" />
      </div>

      {/* 🔹 GRÁFICOS */}
      <DashboardChart dados={dados} />
      <DashboardDailyChart dados={graficoDia} />
      <DashboardStatusChart dados={graficoStatus} />
    </div>
  )
}
