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

  // 🔒 proteção
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [navigate])

  async function carregarDados(dias = periodoAtivo, inicial = false) {
    try {
      inicial ? setLoadingInicial(true) : setLoadingFiltro(true)
      setErro(null)

      const [resumo, dia, status] = await Promise.all([
        api.get(`/dashboard/resumo?dias=${dias}`),
        api.get(`/dashboard/atendimentos-dia?dias=${dias}`),
        api.get(`/dashboard/atendimentos-status?dias=${dias}`)
      ])

      setDados(resumo.data)
      setGraficoDia(dia.data)
      setGraficoStatus(status.data)
    } catch {
      setErro('Erro ao carregar dados do painel')
    } finally {
      setLoadingInicial(false)
      setLoadingFiltro(false)
    }
  }

  async function carregarStatusServidor() {
    try {
      const { data } = await api.get('/status')
      setStatusServidor({
        api: data.api,
        cpu: Number(data.cpu) || 0,
        ram: Number(data.ram) || 0,
        disk: Number(data.disk) || 0
      })
    } catch {
      setStatusServidor({ api: 'offline', cpu: 0, ram: 0, disk: 0 })
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      carregarDados(periodoAtivo, true)
      carregarStatusServidor()
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (localStorage.getItem('token')) {
        carregarStatusServidor()
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  function mudarPeriodo(dias) {
    setPeriodoAtivo(dias)
    carregarDados(dias, false)
  }

  if (loadingInicial) return <DashboardSkeleton />

  if (erro) {
    return <p style={{ color: 'red', padding: 24 }}>{erro}</p>
  }

  return (
    <div style={{ width: '100%' }}>
      {/* HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 16,
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
            borderRadius: 6,
            fontWeight: 'bold'
          }}
        >
          Sair
        </button>
      </div>

      {/* STATUS SERVIDOR */}
      {statusServidor && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
            marginTop: 20
          }}
        >
          <StatusCard
            titulo="API"
            valor={statusServidor.api === 'online' ? 'ONLINE' : 'OFFLINE'}
            cor={statusServidor.api === 'online' ? '#22c55e' : '#dc2626'}
          />
          <StatusCard titulo="CPU" valor={`${statusServidor.cpu}%`} />
          <StatusCard titulo="RAM" valor={`${statusServidor.ram}%`} />
          <StatusCard titulo="DISCO" valor={`${statusServidor.disk}%`} />
        </div>
      )}

      {/* FILTRO */}
      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        {[1, 7, 15, 30].map((dias) => (
          <button
            key={dias}
            onClick={() => mudarPeriodo(dias)}
            style={{
              padding: '8px 16px',
              borderRadius: 6,
              border: 'none',
              background: periodoAtivo === dias ? '#3b82f6' : '#374151',
              color: '#fff'
            }}
          >
            {dias === 1 ? 'Hoje' : `${dias} dias`}
          </button>
        ))}
      </div>

      {loadingFiltro && (
        <p style={{ color: '#9ca3af', marginTop: 10 }}>
          Atualizando dados...
        </p>
      )}

      {/* CARDS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
          marginTop: 20
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


