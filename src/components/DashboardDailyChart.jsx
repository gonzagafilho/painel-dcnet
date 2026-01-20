import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'

export default function DashboardDailyChart({ dados }) {
  return (
    <div
      style={{
        marginTop: '32px',
        background: 'linear-gradient(145deg, #0b1220, #0f1a33)',
        padding: '20px',
        borderRadius: '16px'
      }}
    >
      <h3 style={{ color: '#fff', marginBottom: '16px' }}>
        📅 Atendimentos por dia
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dados}>
          <CartesianGrid stroke="#1f2937" />
          <XAxis dataKey="data" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#22c55e"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

      {dados.length === 0 && (
        <p style={{ color: '#94a3b8', marginTop: '12px' }}>
          Nenhum atendimento registrado ainda
        </p>
      )}
    </div>
  )
}
