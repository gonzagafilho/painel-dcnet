import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from 'recharts'

// 🔹 limites DC NET
const LIMITES = {
  cpu: { alerta: 70, critico: 85 },
  ram: { alerta: 70, critico: 85 },
  disk: { alerta: 80, critico: 90 }
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  const hora = new Date(label).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div
      style={{
        background: '#111827',
        padding: 12,
        borderRadius: 8,
        color: '#fff',
        border: '1px solid #374151'
      }}
    >
      <strong>{hora}</strong>
      {payload.map((p) => (
        <div key={p.dataKey}>
          {p.name}: <strong>{p.value}%</strong>
        </div>
      ))}
    </div>
  )
}

export default function StatusHistoryChart({ data }) {
  return (
    <div style={{ width: '100%', height: 340 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis
            dataKey="createdAt"
            tickFormatter={(v) =>
              new Date(v).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
              })
            }
          />

          <YAxis domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* CPU */}
          <Line
            type="monotone"
            dataKey="cpu"
            name="CPU (%)"
            stroke="#ef4444"
            dot={false}
            strokeWidth={2}
          />
          <ReferenceLine
            y={LIMITES.cpu.alerta}
            stroke="#f59e0b"
            strokeDasharray="4 4"
          />
          <ReferenceLine
            y={LIMITES.cpu.critico}
            stroke="#dc2626"
            strokeDasharray="4 4"
          />

          {/* RAM */}
          <Line
            type="monotone"
            dataKey="ram"
            name="RAM (%)"
            stroke="#3b82f6"
            dot={false}
            strokeWidth={2}
          />
          <ReferenceLine
            y={LIMITES.ram.alerta}
            stroke="#f59e0b"
            strokeDasharray="4 4"
          />
          <ReferenceLine
            y={LIMITES.ram.critico}
            stroke="#dc2626"
            strokeDasharray="4 4"
          />

          {/* DISCO */}
          <Line
            type="monotone"
            dataKey="disk"
            name="DISCO (%)"
            stroke="#f59e0b"
            dot={false}
            strokeWidth={2}
          />
          <ReferenceLine
            y={LIMITES.disk.alerta}
            stroke="#fbbf24"
            strokeDasharray="4 4"
          />
          <ReferenceLine
            y={LIMITES.disk.critico}
            stroke="#dc2626"
            strokeDasharray="4 4"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
