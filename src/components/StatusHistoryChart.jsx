import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

export default function StatusHistoryChart({ data }) {
  const formatTime = (v) =>
    new Date(v).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  return (
    <div style={{ width: '100%', height: 320, marginTop: 24 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="createdAt" tickFormatter={formatTime} />
          <YAxis />
          <Tooltip labelFormatter={formatTime} />
          <Legend />

          <Line type="monotone" dataKey="cpu" name="CPU (%)" stroke="#ef4444" dot={false} />
          <Line type="monotone" dataKey="ram" name="RAM (%)" stroke="#3b82f6" dot={false} />
          <Line type="monotone" dataKey="disk" name="DISCO (%)" stroke="#f59e0b" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
