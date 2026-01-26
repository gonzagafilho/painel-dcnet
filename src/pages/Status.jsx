import { useEffect, useState } from 'react'
import api from '../services/api'

const REFRESH_MS = 30000

// ===== REGRAS DE ALERTA =====
function getNivel(valor, tipo) {
  if (tipo === 'cpu' || tipo === 'ram') {
    if (valor >= 85) return 'critico'
    if (valor >= 70) return 'alerta'
    return 'ok'
  }

  if (tipo === 'disco') {
    if (valor >= 90) return 'critico'
    if (valor >= 80) return 'alerta'
    return 'ok'
  }

  return 'ok'
}

function corNivel(nivel) {
  if (nivel === 'critico') return '#ef4444'
  if (nivel === 'alerta') return '#f59e0b'
  return '#22c55e'
}

// ===== COMPONENTE PRINCIPAL =====
export default function Status() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  async function loadStatus() {
    try {
      const res = await api.get('/status')
      setStatus(res.data)
    } catch {
      setStatus(null)
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
          title="API"
          value={status.api === 'online' ? 'ONLINE' : 'OFFLINE'}
          cor={status.api === 'online' ? '#22c55e' : '#ef4444'}
        />

        <Card
          title="CPU (%)"
          value={status.cpu}
          tipo="cpu"
        />

        <Card
          title="RAM (%)"
          value={status.ram}
          tipo="ram"
        />

        <Card
          title="DISCO (%)"
          value={status.disk}
          tipo="disco"
        />

        <Card
          title="Uptime (s)"
          value={Math.floor(status.uptime)}
        />
      </div>

      <p style={{ opacity: 0.6, marginTop: 12 }}>
        Atualiza automaticamente a cada 30 segundos
      </p>
    </div>
  )
}

// ===== CARD COM ALERTA VISUAL =====
function Card({ title, value, tipo, cor }) {
  const nivel = tipo ? getNivel(Number(value), tipo) : 'ok'
  const corFinal = cor || corNivel(nivel)

  return (
    <div
      style={{
        background: '#111827',
        color: '#fff',
        padding: 20,
        borderRadius: 12,
        minWidth: 160,
        border: tipo ? `2px solid ${corFinal}` : `2px solid ${corFinal}`
      }}
    >
      <p style={{ opacity: 0.7 }}>{title}</p>

      <h3 style={{ color: corFinal }}>
        {value}
      </h3>

      {nivel !== 'ok' && (
        <span style={{ fontSize: 12, fontWeight: 'bold', color: corFinal }}>
          {nivel.toUpperCase()}
        </span>
      )}
    </div>
  )
}
