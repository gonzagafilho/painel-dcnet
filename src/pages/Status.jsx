import { useEffect, useState } from 'react'
import { getStatusAtual, getStatusHistory } from '../services/status'
import StatusCard from '../components/StatusCard'
import StatusHistoryChart from '../components/StatusHistoryChart'

const REFRESH_MS = 30000

export default function Status() {
  const [status, setStatus] = useState(null)
  const [history, setHistory] = useState([])
  const [hours, setHours] = useState(24)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  async function carregarTudo(h = hours) {
    try {
      setLoading(true)
      setErro(null)

      const [statusAtual, historico] = await Promise.all([
        getStatusAtual(),
        getStatusHistory(h)
      ])

      setStatus(statusAtual)
      setHistory(historico)
    } catch {
      setErro('Erro ao carregar status do servidor')
    } finally {
      setLoading(false)
    }
  }

  // carga inicial + auto refresh
  useEffect(() => {
    carregarTudo()

    const interval = setInterval(() => {
      carregarTudo()
    }, REFRESH_MS)

    return () => clearInterval(interval)
    // eslint-disable-next-line
  }, [])

  function mudarPeriodo(h) {
    setHours(h)
    carregarTudo(h)
  }

  if (loading) return <p style={{ padding: 24 }}>Carregando status...</p>

  if (erro) {
    return (
      <p style={{ color: 'red', padding: 24 }}>
        {erro}
      </p>
    )
  }

  if (!status) {
    return <p style={{ padding: 24 }}>Status indisponível</p>
  }

  return (
    <div style={{ padding: 24, width: '100%' }}>
      <h2 style={{ color: '#fff', marginBottom: 16 }}>
        Status do Servidor
      </h2>

      {/* CARDS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20
        }}
      >
        <StatusCard
          titulo="API"
          valor={status.api === 'online' ? 'ONLINE' : 'OFFLINE'}
          cor={status.api === 'online' ? '#22c55e' : '#dc2626'}
        />

        <StatusCard
          titulo="CPU"
          valor={`${status.cpu}%`}
        />

        <StatusCard
          titulo="RAM"
          valor={`${status.ram}%`}
        />

        <StatusCard
          titulo="DISCO"
          valor={`${status.disk}%`}
        />
      </div>

      {/* FILTRO */}
      <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
        {[1, 6, 24, 168].map((h) => (
          <button
            key={h}
            onClick={() => mudarPeriodo(h)}
            style={{
              padding: '8px 16px',
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              background: hours === h ? '#3b82f6' : '#374151',
              color: '#fff'
            }}
          >
            {h === 1 ? '1h' : h === 6 ? '6h' : h === 24 ? '24h' : '7 dias'}
          </button>
        ))}
      </div>

      {/* GRÁFICO */}
      {history.length > 0 ? (
        <div style={{ marginTop: 24 }}>
          <StatusHistoryChart data={history} />
        </div>
      ) : (
        <p style={{ marginTop: 24, opacity: 0.6 }}>
          Nenhum dado histórico disponível
        </p>
      )}

      <p style={{ opacity: 0.6, marginTop: 8 }}>
        Atualização automática a cada 30 segundos
      </p>
    </div>
  )
}
