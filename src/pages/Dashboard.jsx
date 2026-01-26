import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import Card from '../components/Card'
import StatusCard from '../components/StatusCard'
import DashboardChart from '../components/DashboardChart'
import DashboardDailyChart from '../components/DashboardDailyChart'
import DashboardStatusChart from '../components/DashboardStatusChart'
import DashboardSkeleton from '../components/DashboardSkeleton'

export default function Dashboard() {
  const navigate = useNavigate()

  const [dados, setDados] = useState(null)
  const [graficoDia, setGraficoDia] = useState([])
  const [graficoStatus, setGraficoStatus] = useState([])
  const [statusServidor, setStatusServidor] = useState(null)
  const [erro, setErro] = useState(null)

  const [loadingInicial, setLoadingInicial] = useState(true)
  const [loadingFiltro, setLoadingFiltro] = useState(false)
  const [periodoAtivo, setPeriodoAtivo] = useState(7)

  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) navigate('/login')
  }, [navigate])

  async function carregarDados(dias = periodoAtivo, inicial = false) {
    try {
      inicial ? setLoadingInicial(true) : setLoadingFiltro(true)
      setErro(null)

      const resumoResponse = await api.get(`/dashboard/resumo?dias=${dias}`)
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
      setErro('Erro ao carregar dados do painel')
    } finally {
      setLoadingInicial(false)
      setLoadingFiltro(false)
    }
  }

  async function carregarStatusServidor() {
    try {
      const response = await api.get('/status')
      setStatusServidor(response.data)
    } catch {
      setStatusServidor({ api: 'offline' })
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      carregarDados(periodoAtivo, true)
      carregarStatusServidor()
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const interval = setInterval(carregarStatusServidor, 30000)
    return () => clearInterval(interval)
  }, [])

  function mudarPeriodo(dias) {
    setPeriodoAtivo(dias)
    carregarDados(dias, false)
  }

  if (loadingInicial) return <DashboardSkeleton />

  if (erro) {
    return <p style={{ color: 'red', padding: '24px' }}>{erro}</p>
  }

  return (
    <div style={{ width: '100%' }}>
      {/* HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '16px',
          borderBottom: '1px solid #374151'
        }}
      >
        <h1 style={{ color: '#fff' }}>Painel</h1>
        <button
          onClick={logout}
          style={{
            background: '#dc2626',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontWeight: 'bold'
          }}
        >
          Sair
        </button>
      </div>

      {/* STATUS DO SERVIDOR */}
      {statusServidor && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            marginTop: '20px'
          }}
        >
          <StatusCard
            titulo="API"
            valor={statusServidor.api === 'online' ? 'ONLINE' : 'OFFLINE'}
            cor={statusServidor.api === 'online' ? '#22c55e' : '#dc2626'}
          />
          <StatusCard
            titulo="CPU"
            valor={`${statusServidor.cpu}%`}
            cor={
              statusServidor.cpu >= 85
                ? '#dc2626'
                : statusServidor.cpu >= 70
                ? '#facc15'
                : '#22c55e'
            }
          />
          <StatusCard
            titulo="RAM"
            valor={`${statusServidor.ram}%`}
            cor={
              statusServidor.ram >= 85
                ? '#dc2626'
                : statusServidor.ram >= 70
                ? '#facc15'
                : '#22c55e'
            }
          />
          <StatusCard
            titulo="DISCO"
            valor={`${statusServidor.disk}%`}
            cor={
              statusServidor.disk >= 90
                ? '#dc2626'
                : statusServidor.disk >= 80
                ? '#facc15'
                : '#22c55e'
            }
          />
        </div>
      )}

      {/* BOTÕES */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        {[1, 7, 15, 30].map((dias) => (
          <button
            key={dias}
            onClick={() => mudarPeriodo(dias)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background:
                periodoAtivo === dias ? '#3b82f6' : '#374151',
              color: '#fff'
            }}
          >
            {dias === 1 ? 'Hoje' : `${dias} dias`}
          </button>
        ))}
      </div>

      {loadingFiltro && (
        <p style={{ color: '#9ca3af', marginTop: '10px' }}>
          Atualizando dados...
        </p>
      )}

      {/* CARDS EXISTENTES */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginTop: '20px'
        }}
      >
        <Card titulo="Clientes" valor={dados?.clientes} cor="#3b82f6" icone="👥" />
        <Card titulo="Atendimentos" valor={dados?.atendimentos} cor="#22c55e" icone="📞" />
        <Card titulo="Chatbot" valor={dados?.chatbot} cor="#a855f7" icone="🤖" />
        <Card titulo="Servidor" valor={dados?.servidor} cor="#f97316" icone="🖥️" />
      </div>

      {/* GRÁFICOS */}
      <DashboardChart dados={dados} />
      <DashboardDailyChart dados={graficoDia} />
      <DashboardStatusChart dados={graficoStatus} />
    </div>
  )
}

