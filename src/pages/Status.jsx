import { useEffect, useState } from 'react'
import api from '../services/api'
import StatusChart from '../components/StatusChart'

const REFRESH_MS = 30000 // 30s

// ===== REGRAS DE ALERTA =====
function getNivel(valor, tipo) {
  if (tipo === 'cpu' || tipo === 'ram') {
    if (valor > 85) return 'critico'
    if (valor > 70) return 'alerta'
    return 'ok'
  }

  if (tipo === 'disco') {
    if (valor > 90) return 'critico'
    if (valor > 80) return 'alerta'
    return 'ok'
  }

  return 'ok'
}

function corNivel(nivel) {
  if (nivel === 'critico') return '#ef4444' // vermelho
  if (nivel === 'alerta') return '#f59e0b' // laranja
  return '#22c55e' // verde
}

// ===== COMPONENTE PRINCIPAL =====
export default function Status() {
  const [status, setStatus] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadStatus() {
    try {
      const res = await api.get('/status')
      setHistory(res.data)
      setStatus(res.data[res.data.length - 1])
    } catch (err) {
       // erro tratado silenciosamente (logado no backend)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStatus()
    const interval = setInterval(loadStatus, REFRESH_MS)
    return () => clearInterval(interval)
  }, [])

  if (loading) return <p>Carregando status...</p>
  if (!status) return <p>Status indisponível</p>

  return (
    <div style={{ padding: 24 }}>
      <h2>Status do Servidor</h2>

      {/* CARDS */}
      <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
        <Card
          title="CPU (%)"
          value={(status.cpu_load * 100).toFixed(1)}
          suffix="%"
          tipo="cpu"
        />

        <Card
          title="RAM (%)"
          value={status.ram_percent}
          suffix="%"
          tipo="ram"
        />

        <Card
          title="Disco (%)"
          value={status.disk_percent}
          suffix="%"
          tipo="disco"
        />

        <Card
          title="Uptime"
          value={status.uptime_min}
          suffix=" min"
        />
      </div>

      {/* GRÁFICO */}
      <StatusChart data={history} />

      <p style={{ opacity: 0.6, marginTop: 8 }}>
        Atualiza automaticamente a cada 30 segundos
      </p>
    </div>
  )
}

// ===== CARD COM ALERTA VISUAL =====
function Card({ title, value, suffix = '', tipo }) {
  const nivel = tipo ? getNivel(Number(value), tipo) : 'ok'
  const cor = corNivel(nivel)

  return (
    <div
      style={{
        background: '#111827',
        color: '#fff',
        padding: 20,
        borderRadius: 12,
        minWidth: 160,
        border: tipo ? `2px solid ${cor}` : 'none'
      }}
    >
      <p style={{ opacity: 0.7 }}>{title}</p>

      <h3 style={{ color: cor }}>
        {value}
        {suffix}
      </h3>

      {nivel !== 'ok' && (
        <span
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: cor
          }}
        >
          {nivel.toUpperCase()}
        </span>
      )}
    </div>
  )
}
