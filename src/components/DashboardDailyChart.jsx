import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'

export default function DashboardDailyChart({ dados }) {
  if (!Array.isArray(dados) || dados.length === 0) {
    return null
  }

  return (
    <div style={{ marginTop: '40px' }}>
      <h2 style={{ color: '#fff', marginBottom: '12px' }}>
        Atendimentos por Dia
      </h2>

      <div
        style={{
          background: '#020617',
          padding: '20px',
          borderRadius: '12px'
        }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dados}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="dia" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
